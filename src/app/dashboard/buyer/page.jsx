// "use client";

// import { useSession } from "@/lib/auth-client";

// import { useEffect, useState } from "react";
// import { fetcher } from "@/lib/api";

// export default function BuyerDashboard() {
 
//  const [data, setData] = useState(null);

//   useEffect(() => {
//     fetcher("/statistics").then(setData);
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">
//         Buyer Dashboard
//       </h1>
//            <p>Total Orders: {data?.totalOrders}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function BuyerDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!session) return;

    fetch(`http://localhost:5000/buyer/stats?userId=${session.user.id}`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, [session]);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Buyer Dashboard</h1>

      <div>Total Orders: {stats.totalOrders}</div>
      <div>Wishlist: {stats.wishlistCount}</div>

      <h2>Recent Purchases</h2>
      {stats.recentPurchases.map((o) => (
        <div key={o._id}>
          {o.productId} - {o.orderStatus}
        </div>
      ))}
    </div>
  );
}