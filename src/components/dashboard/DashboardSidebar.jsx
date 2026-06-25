"use client";

import Link from "next/link";
import {
  House,
  ShoppingCart,
  Heart,
  Envelope,
  Person,
  Briefcase,
  ShoppingBasket,
  ChartColumn,
  Persons,
  Bars,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
export default function DashboardSidebar() {
  const { data: session } = useSession();

  const role = session?.user?.role || "buyer";

  const buyerMenu = [
    { icon: House, href: "/dashboard/buyer", label: "Dashboard" },
    { icon: ShoppingCart, href: "/dashboard/buyer/orders", label: "My Orders" },
    { icon: Heart, href: "/dashboard/buyer/wishlist", label: "Wishlist" },
    { icon: Envelope, href: "/dashboard/buyer/payments", label: "Payments" },
    { icon: Person, href: "/dashboard/buyer/profile", label: "Profile" },
  ];

  const sellerMenu = [
    { icon: House, href: "/dashboard/seller", label: "Dashboard" },
    { icon: Briefcase, href: "/dashboard/seller/add-products", label: "Add Product" },
    { icon: ShoppingBasket, href: "/dashboard/seller/my-products", label: "My Products" },
    { icon: ShoppingCart, href: "/dashboard/seller/manage-orders", label: "Orders" },
    { icon: ChartColumn, href: "/dashboard/seller/analytics", label: "Analytics" },
  ];

  const adminMenu = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
    { icon: ShoppingBasket, href: "/dashboard/admin/products", label: "Products" },
    { icon: ShoppingCart, href: "/dashboard/admin/orders", label: "Orders" },
    { icon: ChartColumn, href: "/dashboard/admin/analytics", label: "Analytics" },
  ];

  let navItems = buyerMenu;

  if (role === "seller") navItems = sellerMenu;
  if (role === "admin") navItems = adminMenu;

  return (
    <>
      <aside className="hidden lg:block w-64 border-r p-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      <div className="lg:hidden p-2">
        <Drawer>
          <Button variant="secondary">
            <Bars /> Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.Header>
                  <Drawer.Heading>Dashboard</Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link key={item.label} href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}