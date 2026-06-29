"use client";

import { motion } from "framer-motion";

const categories=[

{
name:"Electronics",
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
},

{
name:"Fashion",
image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500"
},

{
name:"Home",
image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"
},

{
name:"Sports",
image:"https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500"
},

{
name:"Beauty",
image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500"
}

];

export default function CategoriesList(){

return(

<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

{

categories.map((item,index)=>(

<motion.div

key={item.name}

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
delay:index*.1
}}

whileHover={{
scale:1.05,
y:-8
}}

className="rounded-xl overflow-hidden shadow-lg bg-gray-800"

>

<img

src={item.image}

className="h-60 w-full object-cover"

/>

<div className="p-5 text-center">

<h2 className="text-xl font-bold">

{item.name}

</h2>

</div>

</motion.div>

))

}

</div>

)

}