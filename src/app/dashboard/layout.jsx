import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getSession } from "@/lib/getSession";

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  const role = session?.user?.role || "buyer";

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={role} />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}