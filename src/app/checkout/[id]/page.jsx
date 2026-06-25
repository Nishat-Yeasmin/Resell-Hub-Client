

import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";
import CheckoutClient from "../CheckoutClient";

export default async function CheckoutPage({ params }) {
  const { id } = await params; // 🔥 THIS IS THE FIX

  const client = await clientPromise;
  const db = client.db(process.env.AUTH_DB_NAME);

const handleOrder = async () => {
  const res = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify({
      productId: product._id,
      sellerInfo: product.sellerInfo,
      amount: product.price,
    }),
  });

  const data = await res.json();
  console.log(data);
};
  
  let product = null;

  try {
    product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    return <div>Invalid Product ID</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="border p-4 rounded-lg">

        <img
  src={product.image}
  alt={product.title}
  className="w-40 h-40 object-cover rounded-lg mt-3"
/>
        <h2 className="text-xl font-bold">
          {product.title}
        </h2>

        <p>{product.description}</p>

        <p className="font-semibold">
          Price: ${product?.price ?? 0}
        </p>

        <form action="">
          <input
            type="text"
            placeholder="Delivery Address"
            className="border p-2 w-full mt-4"
          />

         <CheckoutClient product={product}/>
        </form>
      </div>
    </div>
  );
}