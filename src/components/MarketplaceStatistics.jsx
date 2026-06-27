"use client";

import { useEffect, useState } from "react";
import {CircleCheckFill, Persons, FolderArrowDown, FolderArrowUp} from "@gravity-ui/icons"

const MarketplaceStatistics = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/statistics")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  const statistics = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FolderArrowDown />,
      color: "text-blue-600",
    },
    {
      title: "Total Sellers",
      value: stats.totalSellers,
      icon: <FolderArrowUp />,
      color: "text-green-600",
    },
    {
      title: "Total Buyers",
      value: stats.totalBuyers,
      icon: <Persons />,
      color: "text-purple-600",
    },
    {
      title: "Completed Orders",
      value: stats.completedOrders,
      icon: <CircleCheckFill />,
      color: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-pink-100 text-3xl font-bold text-center mb-3">
          Marketplace Statistics
        </h2>

        <p className="text-center text-gray-200 mb-10">
          Real-time marketplace insights
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((item, index) => (
            <div
              key={index}
              className="bg-indigo-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
            >
              <div
                className={`text-5xl text-blue-950 ${item.color} flex justify-center mb-5`}
              >
                {item.icon}
              </div>

              <h3 className="text-blue-950 text-4xl font-bold mb-2">
                {item.value}
              </h3>

              <p className="text-gray-600 font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceStatistics;