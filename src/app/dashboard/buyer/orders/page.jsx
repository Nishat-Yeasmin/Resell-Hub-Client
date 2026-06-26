

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/orders"
      );

      const data = await res.json();

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      await fetch(
        `http://localhost:5000/orders/${id}/cancel`,
        {
          method: "PATCH",
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {order.productTitle ||
                  "Unknown Product"}
              </h2>

              <p className="mt-2">
                Amount:
                {" "}
                $
                {order.totalAmount ||
                  order.amount}
              </p>

              <p>
                Order Status:
                {" "}
                {order.orderStatus}
              </p>

              <p>
                Payment Status:
                {" "}
                {order.paymentStatus}
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/dashboard/buyer/orders/${order._id}`}
                  className="px-4 py-2 border rounded-lg"
                >
                  View Details
                </Link>

                {order.orderStatus ===
                  "pending" && (
                  <button
                    onClick={() =>
                      handleCancel(
                        order._id
                      )
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}