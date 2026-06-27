import AdminOverview from "@/components/dashboard/AdminOverview";

const AdminDashboardPage = () => {
  return (
    <div className="p-8 bg-gray-800 min-h-7 rounded-2xl">
      <AdminOverview />
    </div>
  );
};

export default AdminDashboardPage;



// "use client";

// import { useSession } from "@/lib/auth-client";

// export default function AdminDashboard() {
//   const { data: session, isPending } = useSession();

//   if (isPending) return <div>Loading...</div>;

//   if (!session) {
//     return <div>Please Login</div>;
//   }

//   if (session.user.role !== "admin") {
//     return <div>Access Denied</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">
//         Admin Dashboard
//       </h1>
//     </div>
//   );
// }