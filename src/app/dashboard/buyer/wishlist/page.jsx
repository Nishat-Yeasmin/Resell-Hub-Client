"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
 const { data: session } = useSession();

//  useEffect(() => {
//     if (!session) return;

//  const fetchWishlist = async () => {
//   try {
//     // if (typeof window === "undefined") return; // 🔥 IMPORTANT FIX

//     // const userId = localStorage.getItem("userId");

//     // if (!userId) return;

//     const res = await fetch("http://localhost:5000/wishlist", {
//       headers: {
//         userid: userId,
//       },
//     });

//     const data = await res.json();
//     setItems(data);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setLoading(false);
//   }
// };
// useEffect(() => {
//   const init = async () => {
//     if (typeof window === "undefined") return;

//     const userId = localStorage.getItem("userId");
//     if (!userId) return;

//     try {
//       const res = await fetch("http://localhost:5000/wishlist", {
//         headers: { userid: userId },
//       });

//       const data = await res.json();
//       setItems(data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   init();
// }, []);

 useEffect(() => {
    if (!session) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/wishlist?userId=${session.user.id}`
        );

        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [session]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/wishlist/${id}`, {
      method: "DELETE",
    });

    setItems(items.filter((item) => item._id !== id));
  };

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist</h2>

      {items.length === 0 ? (
        <p>No wishlist items</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
         <p>{item.title}</p>

            <button className="cursor-pointer my-2 bg-red-800" onClick={() => handleDelete(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}