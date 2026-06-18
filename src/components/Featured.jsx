"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const products = [
  {
    _id: "product001",
    title: "Maybelline Lash Sensational Mascara",
    category: "Makeup",
    condition: "Good",
    price: 850,
    images: ["/products/Mashkara.jpg"],
    description:
      "Volumizing mascara for longer and fuller lashes. Used lightly, almost new condition.",
    sellerInfo: {
      userId: "user001",
      name: "Ayesha Rahman",
      email: "ayesha@gmail.com",
      phone: "+8801712345678",
    },
    status: "available",
  },

  {
    _id: "product002",
    title: "MAC Matte Lipstick - Ruby Woo",
    category: "Makeup",
    condition: "Like New",
    price: 1200,
    images: ["/products/Lipstick.jpg"],
    description:
      "Iconic MAC Ruby Woo lipstick with bold red matte finish. Used only 2–3 times.",
    sellerInfo: {
      userId: "user002",
      name: "Nusrat Jahan",
      email: "nusrat@gmail.com",
      phone: "+8801812345678",
    },
    status: "available",
  },

  {
    _id: "product003",
    title: "L'Oréal Paris Lip Glow Balm",
    category: "Makeup",
    condition: "Good",
    price: 600,
    images: ["/products/Lipglow.jpg"],
    description:
      "Hydrating lip balm that gives natural glow and soft pink tint.",
    sellerInfo: {
      userId: "user003",
      name: "Sadia Islam",
      email: "sadia@gmail.com",
      phone: "+8801912345678",
    },
    status: "available",
  },

  {
    _id: "product004",
    title: "Rare Beauty Liquid Blush",
    category: "Makeup",
    condition: "Excellent",
    price: 1500,
    images: ["/products/Blush.jpg"],
    description:
      "Highly pigmented liquid blush for natural and long-lasting cheek color.",
    sellerInfo: {
      userId: "user004",
      name: "Mehedi Hasan",
      email: "mehedi@gmail.com",
      phone: "+8801612345678",
    },
    status: "available",
  },

  {
    _id: "product005",
    title: "Maybelline Hyper Easy Eyeliner",
    category: "Makeup",
    condition: "Good",
    price: 550,
    images: ["/products/Eyeliner.jpg"],
    description:
      "Waterproof eyeliner pen for smooth and precise eye makeup.",
    sellerInfo: {
      userId: "user005",
      name: "Tanvir Rahman",
      email: "tanvir@gmail.com",
      phone: "+8801512345678",
    },
    status: "available",
  },

  {
    _id: "product006",
    title: "Fit Me Matte + Poreless Foundation",
    category: "Makeup",
    condition: "Used",
    price: 900,
    images: ["/products/Foundation.jpg"],
    description:
      "Lightweight foundation for natural matte finish. Shade: Medium Beige.",
    sellerInfo: {
      userId: "user006",
      name: "Farhana Akter",
      email: "farhana@gmail.com",
      phone: "+8801312345678",
    },
    status: "available",
  },
];

export default function Featured() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured Products
          </h2>
          <p className="text-default-500 mt-3">
            Recently added products from our marketplace.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-content1 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border"
            >
              {/* Product Image */}
       <div className="relative h-56 w-full bg-gray-900">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-3">
                  {product.title}
                </h3>

                
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Price:</span>{" "}
                    {product.price}
                  </p>

                  <p>
                    <span className="font-medium">Condition:</span>{" "}
                    {product.condition}
                  </p>

                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {product.category}
                  </p>
                </div>

                <Button
                  className="w-full mt-5"
                  color="primary"
                >
                  View Details
                  <ArrowRight/>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}