"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function CheckoutClient({ product }) {
  const [address, setAddress] = useState("");
  const { data: session, isPending } = useSession();

  if (isPending) return <p>Loading...</p>;

  const handleOrder = async () => {
    if (!session?.user) {
      alert("Please login first");
      return;
    }

    if (!address) {
      alert("Please enter address");
      return;
    }

    try {
      // 1. CREATE ORDER
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: document.cookie,
        },
        body: JSON.stringify({
          productId: product._id,
          productTitle: product.title,
          productImage: product.image,
          quantity: 1,
          totalAmount: product.price,
          buyerInfo: {
  userId: session.user.id,
  name: session.user.name,
  email: session.user.email,
},
          sellerInfo: product.sellerInfo,
          shippingAddress: address,
        }),
      });

      const orderData = await orderRes.json();
      console.log("ORDER:", orderData);

      if (!orderData.insertedId) {
        alert("Order failed");
        return;
      }

      const orderId = orderData.insertedId;

      // 2. CREATE PAYMENT INTENT
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(product.price),
            orderId,
          }),
        }
      );

      const paymentData = await paymentRes.json();
      console.log("PAYMENT:", paymentData);
if (!paymentData.clientSecret) {
  alert("Client secret missing!");
  return;
}
      // 3. REDIRECT
      window.location.href = `/payment/${orderId}?clientSecret=${paymentData.clientSecret}`;
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-40 h-40 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">
        {product.title}
      </h2>

      <p>{product.description}</p>

      <p className="font-semibold">
        Price: ${product.price}
      </p>

      <input
        type="text"
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mt-4"
      />

      <button
        onClick={handleOrder}
        className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded mt-4"
      >
        Proceed To Payment
      </button>
    </div>
  );
}