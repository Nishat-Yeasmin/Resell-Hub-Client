"use client";

import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    name: "Sadia Islam",
    role: "Buyer",
    image: "https://i.ibb.co.com/YTh3Px5Z/muhammad-ruqi-yaddin-hx-Lv1jq-P0-o-unsplash.jpg",
    review:
      "I found a high-quality laptop at a great price. The buying process was smooth and secure.",
  },
  {
    id: 2,
    name: "Shukria Begum",
    role: "Seller",
    image: "https://i.ibb.co.com/1thJ0s4Q/muhammad-faiz-zulkeflee-Kr-R7x-En4-HV8-unsplash.jpg",
    review:
      "Selling my old furniture was incredibly easy. I connected with buyers within a day.",
  },
  {
    id: 3,
    name: "Yemmi Faiza",
    role: "Buyer",
    image: "https://i.ibb.co.com/kV8wvJ4T/fahri-ramdani-IRPBo-Ft-GLFM-unsplash.jpg",
    review:
      "The platform helped me purchase a used phone that looked almost brand new. Highly recommended!",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-14 bg-gray-800">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Success Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0px 15px 35px rgba(0,0,0,0.25)",
              }}
              className="bg-pink-50 rounded-2xl p-6 text-center"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-500"
              />

              <h3 className="mt-4 text-xl font-bold text-blue-900">
                {story.name}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {story.role}
              </p>

              <p className="text-gray-700 italic">
                {story.review}
              </p>

              <div className="text-yellow-500 text-xl mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}