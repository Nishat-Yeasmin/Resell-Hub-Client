import BuyNowButton from "@/components/BuyNowButton";

import { ObjectId } from "mongodb";
import WishlistButton from "@/components/WishlistButton";
import ReviewButton from "@/components/ReviewButton";

export default async function ProductDetails({ params }) {

    const { id } = await params;

     const res = await fetch(
    `http://localhost:5000/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();


  if (!product?._id) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Product not found</h2>
      </div>
    );
  }



  return (
    <div className="mt-4 p-6 space-y-3 bg-gray-800 border border-white rounded-4xl w-11/12 mx-auto">
      <h1 className="text-2xl font-bold text-center">{product.title}</h1>

      <p className="text-gray-300 text-center">{product.description}</p>

      <p className="text-center">
        <span className="font-semibold ">Category:</span>{" "}
        {product.category}
      </p>

      <p className="text-center">
        <span className="font-semibold ">Condition:</span>{" "}
        {product.condition}
      </p>

      <p className="font-bold text-center text-green-600">
        ${product.price}
      </p>
      <div className="flex gap-2 items-center justify-center">
      <WishlistButton product={product} />
      <BuyNowButton product={product}/>
      <ReviewButton productId={product.id}/>

      </div>
      
    </div>
  );
}