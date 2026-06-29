"use client";

import { useRouter } from "next/navigation";

export default function BuyNowButton({ product }) {
  const router = useRouter();

 const handleBuyNow = () => {
  router.push(`/checkout/${product._id}`);
};

  return (
    <button
      onClick={handleBuyNow}
      className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
    >
      Buy Now
    </button>
  );
}