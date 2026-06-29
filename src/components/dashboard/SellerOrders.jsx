"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchOrders() {
      try {
        const res = await fetch("http://localhost:5000/seller/orders");

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        if (!ignore) {
          setOrders(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);

        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      ignore = true;
    };
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/orders/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Order updated");

        // Refresh Orders
        const orderRes = await fetch(
          "http://localhost:5000/seller/orders"
        );

        const orderData = await orderRes.json();

        setOrders(orderData);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-center">
        Manage Orders
      </h1>

      <p className="text-center text-gray-400 mt-2 mb-8">
        Handle incoming customer orders.
      </p>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th>Product</th>
              <th>Buyer</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.productTitle}</td>

                <td>{order.buyerInfo?.name}</td>

                <td>{order.buyerInfo?.email}</td>

                <td>${order.totalAmount}</td>

                <td>
                  <span
                    className={`badge ${
                      order.orderStatus === "pending"
                        ? "badge-warning"
                        : order.orderStatus === "accepted"
                        ? "badge-info"
                        : order.orderStatus === "processing"
                        ? "badge-primary"
                        : order.orderStatus === "shipped"
                        ? "badge-secondary"
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
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}