"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/analytics/admin")
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  if (!analytics)
    return (
      <p className="text-center py-20">
        Loading...
      </p>
    );

  const userGrowth = analytics.userGrowth.map(
    (value, index) => ({
      month: `M${index + 1}`,
      users: value,
    })
  );

  const monthlyOrders = analytics.orders.map(
    (value, index) => ({
      month: `M${index + 1}`,
      orders: value,
    })
  );

  const categoryData = Object.entries(
    analytics.categories
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-10 text-center">

      <div>
        <h1 className="text-3xl font-bold">
          Platform Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Provides overall business insights.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* User Growth */}

        <div className="bg-pink-50 rounded-xl shadow p-6">

          <h2 className="font-bold mb-4 text-blue-900">
            User Growth Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                dataKey="users"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Monthly Orders */}

        <div className="bg-pink-50 rounded-xl shadow p-6">

          <h2 className="text-blue-900 font-bold mb-4">
            Monthly Orders Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="orders"
                fill="#10B981"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Category Performance */}

        <div className="bg-pink-50 rounded-xl shadow p-6">

          <h2 className="font-bold mb-4 text-blue-900">
            Category Performance Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* Top Categories */}

        <div className="bg-pink-50 rounded-xl shadow p-6">

          <h2 className="font-bold mb-4 text-blue-900">
            Top Categories Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#F59E0B"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-pink-100 rounded-xl shadow p-6">

        <h2 className="font-bold text-xl text-blue-900 mb-3">
          Purpose
        </h2>

        <p className="text-gray-600 leading-8">
          These analytics help administrators
          understand platform growth, user
          activity, product performance and
          overall marketplace trends. The charts
          provide valuable insights into user
          engagement, monthly order activity and
          top-performing product categories.
        </p>

      </div>

    </div>
  );
};

export default AdminAnalytics;