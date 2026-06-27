"use client";

import { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = () => {
    fetch("http://localhost:5000/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleStatus = async (id, status) => {
    await fetch(
      `http://localhost:5000/admin/products/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await fetch(
      `http://localhost:5000/admin/products/${id}`,
      {
        method: "DELETE",
      }
    );

    loadProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-700 rounded-xl shadow-lg p-6">

      <h1 className="text-3xl font-bold text-center">
        Manage Products
      </h1>

      <p className="text-gray-400 mt-2 mb-6 text-center">
        Admin reviews and moderates all product listings.
      </p>

      <input
        type="text"
        placeholder="Search Product..."
        className="input input-bordered w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">

        <table className="table w-full">

          <thead className="bg-gray-900 text-gray-300">

            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
              <th className="px-6 py-4">Reported</th>
            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr key={product._id}>

                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt=""
                    className="w-14 h-14 rounded"
                  />
                </td>

                <td>{product.title}</td>

                <td>{product.category}</td>

                <td>${product.price}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm

                    ${
                      product.status === "approved"
                        ? "bg-green-500"
                        : product.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }
                    `}
                  >
                    {product.status || "pending"}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleStatus(
                          product._id,
                          "approved"
                        )
                      }
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleStatus(
                          product._id,
                          "rejected"
                        )
                      }
                      className="btn btn-warning btn-sm"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>

                  </div>

                </td>
                <td>
  {product.reported ? (
    <span className="badge badge-error">Reported</span>
  ) : (
    <span className="badge badge-success">No Report</span>
  )}
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageProducts;