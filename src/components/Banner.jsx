"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowRight, ShoppingCart, Plus } from "@gravity-ui/icons";
import Image from "next/image";

export default function Banner() {
   const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/statistics")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch((err) => console.log(err));
  }, []);

  const stats = [
    {
      number: statistics.totalProducts,
      label: "Products",
    },
    {
      number: statistics.totalUsers,
      label: "Users",
    },
    {
      number: statistics.totalOrders,
      label: "Orders",
    },
    {
      number: statistics.completedOrders,
      label: "Completed",
    },
  ];

  

  return (
    <section className="bg-gradient-to-b from-gray-700 to-gray-900">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 font-medium text-primary">
              Welcome to <span className="text-blue-700 font-medium text-primary">ReSell Hub</span> 
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Buy & Sell
              <span className="text-primary"> Pre-Owned </span>
              Products Easily
            </h1>

            <p className="mb-8 max-w-xl text-lg text-gray-400">
              Give your unused items a second life and find amazing deals from
              trusted sellers.
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                color="primary"
                
              >
                Browse Products
                <ArrowRight/>
              </Button>
              

              <Button
                size="lg"
                variant="secondary"
            
              >
                Start Selling
                <Plus/>
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-orange-100 p-4 text-center shadow-sm"
                >
                  <h3 className="text-2xl font-bold text-blue-950">
                    {item.number}
                  </h3>
                  <p className="text-sm text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="relative">
              <Image
                src="/Hero_Banner.jpg"
                alt="Resell Hub Banner"
                width={600}
                height={500}
                className="rounded-3xl object-cover shadow-xl"
              />

              <div className="absolute -bottom-5 -left-5 rounded-xl bg-orange-100 p-4 shadow-lg">
                <div className="flex items-center gap-2 text-blue-950">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-semibold">
                    Best Deals Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}