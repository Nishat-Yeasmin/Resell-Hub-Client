"use client";

import { motion } from "framer-motion";

const categories=[

{
name:"Electronics",
image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
},

{
name:"Fashion",
image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFrZXVwfGVufDB8fDB8fHww"
},

{
name:"Book",
image:"https://images.unsplash.com/photo-1694730750153-8b66cf3dd014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
},

{
name:"Furniture",
image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
},

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