"use client";

import { Prompt } from "next/font/google";
import { useEffect, useState } from "react";

export default function MyProducts() {

  const [products, setProducts] = useState([]);
const [category, setCategory] = useState("");
const [condition, setCondition] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {
  const url = `http://localhost:5000/products?search=${search}&category=${category}&condition=${condition}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => setProducts(data));
}, [search, category, condition]);

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

const handleEdit = async (product) => {
  const newTitle = prompt("New Title:", product.title);
  const newPrice = prompt("New Price:", product.price);
  const newCategory = prompt("New Category:", product.category);
  const newStatus = prompt("New Status:",product.status);
  const newStock = prompt("New Stock:", product.stock);

  const updatedData = {
    title: newTitle || product.title,
    price: newPrice ? Number(newPrice) : product.price,
    category: newCategory || product.category,
    status: newStatus || product.status,
    stock: newStock ? Number(newStock) : product.stock,
  };

  await fetch(`http://localhost:5000/products/${product._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  setProducts(
    products.map((p) =>
      p._id === product._id ? { ...p, ...updatedData } : p
    )
  );
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Products
      </h2>

      
<input
  className="my-4 bg-blue-800 rounded px-2 text-white"
  placeholder="Search Product"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<select className="mx-3 border border-amber-50 rounded px-2"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option className="bg-gray-900" value="">All Category</option>
  <option className="bg-gray-900" value="Electronics">Electronics</option>
  <option className="bg-gray-900" value="Fashion">Fashion</option>
</select>

<select className="mx-3  border border-amber-50 rounded px-2"
  value={condition}
  onChange={(e) => setCondition(e.target.value)}
>
  <option className="bg-gray-900" value="">All Condition</option>
  <option className="bg-gray-900" value="Used">Used</option>
  <option className="bg-gray-900" value="Refurbished">Refurbished</option>
</select>

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

           <button
  onClick={() => handleEdit(product)}
  className="bg-blue-900 text-white px-3 py-1 rounded mt-2 mx-2"
>
  Edit
</button>

            <button
  onClick={() => handleDelete(product._id)}
  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
  Delete
</button>

          </div>

          
        ))}
      </div>
    </div>
  );
}