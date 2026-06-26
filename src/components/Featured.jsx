"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();

        // 🔥 IMPORTANT FIX HERE
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); // fallback safe array
          console.log("API Error:", data);
        }
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!products.length) {
    return <p className="p-6">No products found</p>;
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg overflow-hidden"
          >
            <div className="relative h-40 w-full">
              <Image
                src={p.images?.[0] || "/placeholder.png"}
                alt={p.title || "product"}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3 space-y-1">
              <h3 className="font-semibold">{p.title}</h3>

              <p className="text-sm text-gray-600">
                Category: {p.category}
              </p>

              <p className="text-sm">
                Condition: {p.condition}
              </p>

              <p className="font-bold text-green-600">
                ${p.price}
              </p>

              <Link href={`/products/${p._id}`}>
                <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}