"use client";

import { useEffect, useState } from "react";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><b>Product:</b> {order.productTitle || "N/A"}</p>
            <p><b>Amount:</b> {order.totalAmount}</p>
            <p><b>Status:</b> {order.orderStatus}</p>
            <p><b>Payment:</b> {order.paymentStatus}</p>
          </div>
        ))
      )}
    </div>
  );
}