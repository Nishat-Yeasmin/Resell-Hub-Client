import BuyNowButton from "@/components/BuyNowButton";

import { ObjectId } from "mongodb";

export default async function ProductDetails({ params }) {

     const res = await fetch(
    `http://localhost:5000/products/${params.id}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();
//   const client = await clientPromise;
//   const db = client.db(process.env.AUTH_DB_NAME);

//   let product = null;

//   try {
//     product = await db
//       .collection("products")
//       .findOne({ _id: new ObjectId(params.id) });
//   } catch (error) {
//     return (
//       <div className="p-6 text-red-500">
//         Invalid product ID
//       </div>
//     );
//   }

  if (!product?._id) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <p className="text-gray-700">{product.description}</p>

      <p>
        <span className="font-semibold">Category:</span>{" "}
        {product.category}
      </p>

      <p>
        <span className="font-semibold">Condition:</span>{" "}
        {product.condition}
      </p>

      <p className="font-bold text-green-600">
        ${product.price}
      </p>
      <BuyNowButton product={product}/>
    </div>
  );
}