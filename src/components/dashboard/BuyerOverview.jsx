"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Box, Heart, ShoppingCart } from "@gravity-ui/icons";
import { useEffect, useState } from "react";


const BuyerOverview = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistCount: 0,
    recentPurchases: [],
  });

  const {data: session} = authClient.useSession()
  const userId = session?.user?.id;

  useEffect(() => {
    fetch(
      `http://localhost:5000/buyer/stats?userId=${userId}`
    )
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, [userId]);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart />,
      color: "bg-blue-500",
    },
    {
      title: "Wishlist Count",
      value: stats.wishlistCount,
      icon: <Heart />,
      color: "bg-pink-500",
    },
    {
      title: "Recent Purchases",
      value: stats.recentPurchases.length,
      icon: <Box />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-8">

      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-gray-400 mt-2">
          After login, a buyer can see a summary of their activity.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-fuchsia-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div
              className={`w-14 h-14 rounded-full ${card.color} flex items-center justify-center text-white text-2xl mb-4`}
            >
              {card.icon}
            </div>

            <h2 className="text-4xl font-bold text-blue-900">
              {card.value}
            </h2>

            <p className="text-gray-600 mt-2">
              {card.title}
            </p>
          </div>
        ))}

      </div>

      {/* Recent Purchases */}

      <div className="bg-fuchsia-100 rounded-xl shadow-lg p-6">

        <h2 className="text-blue-900 text-2xl font-bold mb-5">
          Recent Purchases
        </h2>

        {stats.recentPurchases.length === 0 ? (
          <p className="text-gray-700">
            No recent purchases found.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="table w-full">

              <thead className="bg-gray-800">

                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody className="bg-gray-700">

                {stats.recentPurchases.map((item) => (
                  <tr key={item._id}>

                    <td>{item.productTitle}</td>

                    <td>{item.quantity}</td>

                    <td>${item.totalAmount}</td>

                    <td>

                      <span
                        className={`badge ${
                          item.orderStatus ===
                          "delivered"
                            ? "badge-success"
                            : item.orderStatus ===
                              "pending"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {item.orderStatus}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default BuyerOverview;