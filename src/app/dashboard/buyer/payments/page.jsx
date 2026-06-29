"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } =
  authClient.useSession();

const userId = session?.user?.id;
console.log("SESSION:", session);
console.log("USER ID:", session?.user?.id);

  useEffect(() => {
     console.log("userId:", userId);

  if (!userId) return;

  fetch(
    `http://localhost:5000/payments?userId=${userId}`
  )
    .then((res) => res.json())
    .then((data) => {
       console.log("Payments:", data);
      setPayments(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [userId]);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="bg-gray-800 border border-gray-200 rounded-4xl" style={{ padding: "20px" }}>
      <h2 className="text-2xl font-semibold text-center mb-5">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        payments.map((pay) => (
          <div className="rounded-2xl"
            key={pay._id}
            style={{
              border: "2px solid #ddd",
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