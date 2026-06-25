



"use client";

import { useSession } from "@/lib/auth-client";

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  if (!session) {
    return <div>Please Login</div>;
  }

  if (session.user.role !== "admin") {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>
    </div>
  );
}