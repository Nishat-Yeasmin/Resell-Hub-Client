"use client";

import { useEffect, useState } from "react";

export default function OrderDetailsPage({
  params,
}) {
  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/orders/${params.id}`
        );

        const data = await res.json();

        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      <div className="border rounded-xl p-6 space-y-4">

        {order.productImage && (
          <img
            src={order.productImage}
            alt={
              order.productTitle
            }
            className="w-48 h-48 object-cover rounded-lg"
          />
        )}

        <h2 className="text-2xl font-semibold">
          {order.productTitle}
        </h2>

        <p>
          Product ID:
          {" "}
          {order.productId}
        </p>

        <p>
          Quantity:
          {" "}
          {order.quantity || 1}
        </p>

        <p>
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

        <p>
          Shipping Address:
          {" "}
          {order.shippingAddress ||
            "Not Provided"}
        </p>

        <hr />

        <h3 className="font-bold">
          Buyer Information
        </h3>

        <p>
          Name:
          {" "}
          {order?.buyerInfo
            ?.name || "N/A"}
        </p>

        <p>
          Email:
          {" "}
          {order?.buyerInfo
            ?.email || "N/A"}
        </p>

        <hr />

        <h3 className="font-bold">
          Seller Information
        </h3>

        <p>
          Name:
          {" "}
          {order?.sellerInfo
            ?.name || "N/A"}
        </p>

        <p>
          Email:
          {" "}
          {order?.sellerInfo
            ?.email || "N/A"}
        </p>

        <p>
          Order Date:
          {" "}
          {order.createdAt
            ? new Date(
                order.createdAt
              ).toLocaleString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}