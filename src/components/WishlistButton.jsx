"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const WishlistButton = ({ product }) => {
  const { data: session } = authClient.useSession();

  const addWishlist = async () => {
    if (!session?.user) {
      toast.error("Please login first.");
      return;
    }

    const body = {
      userId: session.user.id,
      productId: product._id,
      productTitle: product.title,
      productImage: product.image,
      price: product.price,
    };

    try {
      const res = await fetch("http://localhost:5000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Added to wishlist!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <button
      onClick={addWishlist}
      className="btn btn-secondary"
    >
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;