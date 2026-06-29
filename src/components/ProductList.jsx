"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));

  }, []);

  return (

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {products.map((product, index) => (

        <motion.div

          key={product._id}

          initial={{
            opacity:0,
            y:40
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.4,
            delay:index*.08
          }}

          whileHover={{
            y:-10,
            scale:1.03
          }}

          className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"

        >

          <img
            src={product.image}
            className="w-full h-56 object-cover"
          />

          <div className="p-5">

            <h2 className="font-bold text-xl">

              {product.title}

            </h2>

            <p className="text-blue-400 mt-2">

              ${product.price}

            </p>

            <p className="text-sm mt-2">

              {product.category}

            </p>

            <Link
              href={`/products/${product._id}`}
              className="btn btn-primary mt-4 w-full"
            >
              View Details
            </Link>

          </div>

        </motion.div>

      ))}

    </div>

  );

}