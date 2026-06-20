"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BuyerDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (session?.user?.role !== "buyer") {
      router.push("/");
    }
  }, [session, isPending, router]);

  return <div>Buyer Dashboard</div>;
}