"use client";

import { useEffect, useState } from "react";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

const handleDelete = async (id) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete?"
  );

  if (!confirmDelete) return;

  await fetch(`http://localhost:5000/products/${id}`, {
    method: "DELETE",
  });

  setProducts(products.filter((p) => p._id !== id));
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Products
      </h2>

      
<input className="my-4 bg-blue-800 rounded px-2 "
  type="text"
  placeholder="Search Product"
/>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="font-bold mt-3">
              {product.title}
            </h3>

            <p>৳ {product.price}</p>

            <p>{product.category}</p>

            <p>Stock: {product.stock}</p>

            <p>Status: {product.status}</p>

          </div>

          
        ))}
      </div>
    </div>
  );
}