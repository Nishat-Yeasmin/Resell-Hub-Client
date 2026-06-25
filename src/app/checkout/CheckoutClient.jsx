"use client";

export default function CheckoutClient({ product }) {
  const handleOrder = async () => {
    if (!product) return;

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

  return (
    <button
      onClick={handleOrder}
      className="bg-green-600 text-white px-4 py-2 rounded mt-4 cursor-pointer"
    >
      Proceed To Payment
    </button>
  );
}