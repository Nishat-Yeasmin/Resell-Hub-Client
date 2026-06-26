"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-5">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/products?category=${cat.name}`}
            className="border rounded-xl p-4 text-center hover:shadow-md transition"
          >
            <img
              src={cat.image}
              className="w-14 h-14 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-2 font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.count} items</p>
          </Link>
        ))}
      </div>
    </section>
  );
}