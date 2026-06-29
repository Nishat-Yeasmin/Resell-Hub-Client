"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BuyerWishlist = () => {
  const { data: session } = authClient.useSession();

  const userId = session?.user?.id;

  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/wishlist?userId=${userId}`
    )
      .then((res) => res.json())
      .then((data) => setWishlist(data));
  };

  useEffect(() => {
    if (!userId) return;

    loadWishlist();
  }, [userId]);

  const removeWishlist = async (id) => {
    if (!confirm("Remove this product?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Removed from wishlist");
      loadWishlist();
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow">

      <h1 className="text-3xl font-bold text-center">
        Wishlist
      </h1>

      <p className="text-gray-400 text-center mt-2 mb-8">
        Buyers can save products for future purchase.
      </p>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl">
            No wishlist items found.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {wishlist.map((item) => (

            <div
              key={item._id}
              className="bg-gray-800 rounded-xl p-4"
            >

              <img
                src={item.productImage}
                className="h-52 w-full object-cover rounded-lg"
                alt=""
              />

              <h2 className="text-xl font-bold mt-4">
                {item.productTitle}
              </h2>

              <p className="mt-2 text-lg font-semibold text-primary">
                ${item.price}
              </p>

              <div className="flex gap-3 mt-5">

                <Link
                  href={`/products/${item.productId}`}
                  className="btn btn-primary flex-1"
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    removeWishlist(item._id)
                  }
                  className="btn btn-error"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default BuyerWishlist;