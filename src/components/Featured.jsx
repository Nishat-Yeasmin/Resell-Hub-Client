"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion
  
 } from "framer-motion";
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
    <section className="p-6 bg-gray-800">
      <h2 className="text-2xl font-bold my-5 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <motion.div
            key={p._id}
             className="border rounded-lg overflow-hidden bg-white shadow-md"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  whileHover={{
    scale: 1.05,
    y: -8,
    boxShadow: "0px 15px 35px rgba(0,0,0,0.25)",
  }}
          >
            <div className="relative h-40 w-full">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3 space-y-1 bg-red-50">
              <h3 className="font-semibold text-blue-950">{p.title}</h3>

              <p className="text-sm text-gray-600">
                Category: {p.category}
              </p>

              <p className="text-sm text-gray-700">
                Condition: {p.condition}
              </p>

              <p className="font-bold text-green-600">
                ${p.price}
              </p>

              <Link href={`/products/${p._id}`}>
                <motion.button
                 whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="cursor-pointer mt-2 w-full bg-blue-600 text-white py-1 rounded">
                  Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}