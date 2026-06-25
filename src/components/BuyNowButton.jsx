"use client";

import { useRouter } from "next/navigation";

export default function BuyNowButton({ product }) {
  const router = useRouter();

  const handleBuyNow = () => {
    localStorage.setItem(
      "checkoutProduct",
      JSON.stringify(product)
    );

    router.push("/checkout");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Buy Now
    </button>
  );
}