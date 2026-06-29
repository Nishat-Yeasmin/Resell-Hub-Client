


import CheckoutClient from "@/components/CheckoutClient";


export default async function CheckoutPage({ params }) {
  const { id } = await params; // 🔥 THIS IS THE FIX
  const res = await fetch(
    `http://localhost:5000/products/${id}`,
    {
      cache: "no-store",
    }
  );
  

    const product = await res.json();

  if (!product?._id) {
    return <div>Product Not Found</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

         <CheckoutClient product={product}/>
        
    </div>
  );
}