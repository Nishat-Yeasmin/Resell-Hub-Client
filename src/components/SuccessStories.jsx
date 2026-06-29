"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SuccessStories() {

  const [reviews,setReviews]=useState([]);

  useEffect(()=>{

    fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/reviews`)

    .then(res=>res.json())

    .then(data=>setReviews(data));

  },[]);

  return (

<section className="py-14 bg-gray-800">

<div className="max-w-6xl mx-auto px-5">

<h2 className="text-3xl font-bold text-center mb-10">

Success Stories

</h2>
<p className="text-center text-gray-400 mb-10">
  Real user reviews are automatically displayed here.
</p>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{

reviews.map((review,index)=>(

<motion.div

key={review._id}

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.5,
delay:index*.15
}}

whileHover={{
scale:1.05,
y:-8
}}

className="bg-pink-50 rounded-2xl p-6 text-center"

>

<img

src={`https://ui-avatars.com/api/?name=${review.reviewerInfo.name}&background=random`}

className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500"

/>

<h3 className="mt-4 text-xl font-bold text-blue-900">

{review.reviewerInfo.name}

</h3>

<p className="text-sm text-gray-500">

Buyer

</p>

<p className="mt-4 italic text-gray-700">

{review.comment}

</p>

<div className="mt-4">

{

Array.from({
length:review.rating
}).map((_,i)=>(

<span
key={i}
className="text-yellow-500 text-xl"
>

⭐

</span>

))

}

</div>

</motion.div>

))

}

</div>

</div>

</section>

  );

}