"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    FileText,
    ShoppingCart,
    Clock,
    CircleDollar,
} from "@gravity-ui/icons";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/seller/stats?userId=${userId}`
      )
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      });
  }, []);



  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-2">
        Seller Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Dashboard Overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Total Products"
          value={stats.totalProducts}
          icon={<FileText size={30} />}
          color="bg-blue-500"
        />

        <Card
          title="Total Sales"
          value={stats.totalSales}
          icon={<ShoppingCart size={30} />}
          color="bg-green-500"
        />

        <Card
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<CircleDollar size={30} />}
          color="bg-purple-500"
        />

        <Card
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<Clock size={30} />}
          color="bg-orange-500"
        />

      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className="text-3xl text-blue-900 font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`${color} p-4 rounded-full text-white`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}