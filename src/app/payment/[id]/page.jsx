
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { use, useState } from "react";
import { param } from "framer-motion/client";

function CheckoutForm({ clientSecret, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
try {
    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

     if (result.error) {
    alert(result.error.message);
    setLoading(false);
    return;
  }

      if (result.paymentIntent?.status !== "succeeded") {
      alert("Payment not completed");
      return;
    }
     
    
      const res = await fetch("http://localhost:5000/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          transactionId: result.paymentIntent.id,
          amount: result.paymentIntent.amount / 100,
        }),
      });
        const data = await res.json();
      console.log("Payment confirm response:", data);

      if (!res.ok) {
        alert("Payment save failed!");
        setLoading(false);
        return;
      }

      alert("Payment Successful!");
      window.location.href = "/dashboard/buyer/orders";

    } catch (err) {
      console.error(err);
      alert("Server error");
       } finally {
    setLoading(false);
  }
   };

     return (
    <div className="p-6 border rounded-lg">
      <CardElement className="border p-3" />

      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-blue-600 cursor-pointer text-white px-4 py-2 mt-4"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

 

export default function PaymentPage({ params }) {
  //  const params = useParams();
  const {id} = use(params)
  const searchParams = useSearchParams();
  // const orderId = params.id;

  const clientSecret = searchParams.get("clientSecret");

if (!clientSecret || typeof clientSecret !== "string") {
  return <p>Invalid payment session</p>;
}
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Complete Payment</h1>

        <CheckoutForm
          clientSecret={clientSecret}
          orderId={id}
        />
      </div>
    </Elements>
  );
}