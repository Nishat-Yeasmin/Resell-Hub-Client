"use client";

import { FolderArrowUp, Persons, ShoppingCart } from "@gravity-ui/icons";
import { useEffect, useState } from "react";


const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Persons />,
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FolderArrowUp />,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-center text-3xl font-bold mb-8">
        Dashboard Overview
      </h1>

      <p className="text-gray-400 text-center mb-8">
        The admin has full control over the platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-pink-50  rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div
              className={`w-16 h-16 ${card.color} rounded-full flex items-center justify-center  text-white text-3xl mb-5`}
            >
              {card.icon}
            </div>

            <h2 className="text-blue-950 text-4xl font-bold">
              {card.value}
            </h2>

            <p className="text-gray-600 mt-2">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;