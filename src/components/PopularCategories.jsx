"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/categories`);
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
    <section className="py-10 text-center bg-gray-900">
      <h2 className="text-2xl font-bold mb-5">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5  ml-50">
        {categories.map((cat, i) => (

           <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: i * 0.1,
        }}
        whileHover={{
          scale: 1.08,
          y: -8,
          boxShadow: "0px 15px 30px rgba(247, 233, 233, 0.67)",
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-pink-100 border border-gray-950 rounded-xl overflow-hidden"
      >
          <Link
            href={`/products?category=${cat.name}`}
            className="block p-4 text-center hover:shadow-md transition"
          >
            <motion.img
              src={cat.image}
               alt={cat.name}
            className="w-14 h-14 mx-auto rounded-full object-cover"
            whileHover={{ rotate: 8, scale: 1.15 }}
            transition={{ duration: 0.3 }}
            />
            <h3 className="mt-2 text-blue-900 font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-600">{cat.count} items</p>
          </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}