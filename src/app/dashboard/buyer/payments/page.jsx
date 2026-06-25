"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/payments")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        payments.map((pay) => (
          <div
            key={pay._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><b>Transaction ID:</b> {pay.transactionId}</p>
            <p><b>Amount:</b> {pay.amount}</p>
            <p><b>Status:</b> {pay.paymentStatus}</p>
            <p>
              <b>Date:</b>{" "}
              {pay.paymentDate
                ? new Date(pay.paymentDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}