"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [condition, setCondition] = useState("");

const [sort, setSort] = useState("");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/products?search=${search}&category=${category}&condition=${condition}&page=${page}&sort=${sort}&limit=6`)
      .then(res => res.json())
      .then((data) => { setProducts(data.products);
      setTotalPages(data.totalPages);
  });

  }, [search,category,condition,sort,page]);

  return (

    <div>
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <input
    type="text"
    placeholder="Search products..."
    value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setPage(1);
  }}
    className="border px-4 py-2 rounded-lg w-64"
  />
  <select
   value={category}
  onChange={(e) => {
    setCategory(e.target.value);
    setPage(1);
  }}
   className="border px-4 py-2 rounded-lg bg-gray-700 cursor-pointer">
    <option>All Categories</option>
    <option>Electronics</option>
    <option>Fashion</option>
    <option>Furniture</option>
    <option>Books</option>
  </select>
  
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="border px-4 py-2 rounded-lg bg-gray-700 cursor-pointer"
  >
    <option value="">Default</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
  </select>
</div>

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

{/* paginaiton */}

<div className="flex justify-center gap-2 mt-10">
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="cursor-pointer btn btn-outline"
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setPage(index + 1)}
      className={`btn ${
        page === index + 1
          ? "btn-primary cursor-pointer"
          : "btn-outline cursor-pointer"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    className="btn btn-outline cursor-pointer"
  >
    Next
  </button>
</div>
    </div>

  );

}