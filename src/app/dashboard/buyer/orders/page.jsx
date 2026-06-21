"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // later: dynamic auth user id use korba
  const buyerId = "user001";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/orders?buyerId=${buyerId}`
        );

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-4">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow"
            >
              <p>
                <b>Product ID:</b> {order.productId}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span>
                  {order.orderStatus || "Pending"}
                </span>
              </p>

              <p>
                <b>Seller:</b> {order.sellerInfo?.name}
              </p>

              <p>
                <b>Buyer:</b> {order.buyerInfo?.name}
              </p>

              <div className="text-sm text-gray-500 mt-2">
                Order ID: {order._id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}