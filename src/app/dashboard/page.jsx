"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }

    const role = session.user.role;

    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "seller") {
      router.push("/dashboard/seller");
    } else {
      router.push("/dashboard/buyer");
    }
  }, [session, isPending, router]);

  return <div>Loading...</div>;
}