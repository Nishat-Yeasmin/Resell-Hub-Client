"use client";

import { useEffect, useState } from "react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetch("http://localhost:5000/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(
      `http://localhost:5000/admin/orders/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    loadOrders();
  };

  return (
    <div className="bg-gray-700 rounded-xl shadow-lg p-6">

      <h1 className="text-3xl text-center font-bold">
        Manage Orders
      </h1>

      <p className="text-gray-400 text-center mt-2 mb-6">
        Admin can monitor all orders across the platform.
      </p>

      <div className="overflow-x-auto">

        <table className="table w-full">

          <thead className="bg-gray-900 text-white">

            <tr>
              <th>Product</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td>{order.productTitle}</td>

                <td>{order.buyerInfo?.name}</td>

                <td>{order.sellerInfo?.name}</td>

                <td>${order.totalAmount}</td>

                <td>

                  <span
                    className={`badge
                    ${
                      order.orderStatus === "pending"
                        ? "badge-warning"
                        : order.orderStatus === "shipped"
                        ? "badge-info"
                        : order.orderStatus === "delivered"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td>

                  <select
                    className="select select-bordered select-sm"
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="processing">
                      Processing
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageOrders;