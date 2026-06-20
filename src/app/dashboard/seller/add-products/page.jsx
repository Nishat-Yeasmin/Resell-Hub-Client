"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const productData = {
      title: form.title.value,
      category: form.category.value,
      condition: form.condition.value,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      image: form.image.value,
      description: form.description.value,

      sellerInfo: {
        userId: "seller123",
        name: "Nusrat Jahan",
        email: "nusrat@gmail.com",
      },

      status: "available",
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Product Added Successfully");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          className="w-full border p-3 rounded"
          required
        />

        {/* Image */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          required
        />

        {/* Category */}
        <select
          name="category"
          className="w-full border p-3 rounded"
          required
        >
          <option value="">
            Select Category
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Furniture">
            Furniture
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Fashion">
            Fashion
          </option>
        </select>

        {/* Condition */}
        <select
          name="condition"
          className="w-full border p-3 rounded"
          required
        >
          <option value="">
            Select Condition
          </option>

          <option value="Used">
            Used
          </option>

          <option value="Like New">
            Like New
          </option>

          <option value="Refurbished">
            Refurbished
          </option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          required
        />

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          className="w-full border p-3 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          rows="5"
          placeholder="Description"
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading
            ? "Adding..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
}