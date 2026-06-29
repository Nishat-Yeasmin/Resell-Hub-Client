"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const monthlySales = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1800 },
  { month: "Mar", sales: 2400 },
  { month: "Apr", sales: 2000 },
  { month: "May", sales: 3000 },
  { month: "Jun", sales: 3600 },
];

const topProducts = [
  {
    name: "Laptop",
    sold: 35,
  },
  {
    name: "Phone",
    sold: 28,
  },
  {
    name: "Headphone",
    sold: 22,
  },
  {
    name: "Watch",
    sold: 18,
  },
  {
    name: "Camera",
    sold: 15,
  },
];

const salesShare = [
  {
    name: "Electronics",
    value: 45,
  },
  {
    name: "Fashion",
    value: 25,
  },
  {
    name: "Home",
    value: 15,
  },
  {
    name: "Sports",
    value: 15,
  },
];

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export default function SellerAnalytics() {
  return (
    <div className="space-y-8">

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Sales Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Visual representation of seller performance.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-base-200 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Sales
          </h3>

          <p className="text-3xl font-bold text-primary mt-3">
            $14,000
          </p>

        </div>

        <div className="bg-base-200 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Orders
          </h3>

          <p className="text-3xl font-bold text-success mt-3">
            118
          </p>

        </div>

        <div className="bg-base-200 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Products Sold
          </h3>

          <p className="text-3xl font-bold text-warning mt-3">
            226
          </p>

        </div>

        <div className="bg-base-200 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Revenue
          </h3>

          <p className="text-3xl font-bold text-secondary mt-3">
            $28,500
          </p>

        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Monthly Sales */}

        <div className="bg-base-200 rounded-xl shadow p-5">

          <h2 className="text-xl font-bold mb-5">
            Monthly Sales Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Top Selling */}

        <div className="bg-base-200 rounded-xl shadow p-5">

          <h2 className="text-xl font-bold mb-5">
            Top Selling Products
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="sold"
                fill="#10B981"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Pie */}

      <div className="bg-base-200 rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Sales Chart
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>

            <Pie
              data={salesShare}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {salesShare.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}