"use client";

import {
  LayoutSideContentLeft,
  Envelope,
  House,
  Person,
  Briefcase,
  ShoppingCart,
  Heart,
 ShoppingBasket,
  ChartColumn,
  Persons,
  Bars,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const mockUserRole = "buyer";

export default function DashboardSidebar() {
  const buyerMenu = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: ShoppingCart, href: "/dashboard/my-orders", label: "My Orders" },
    { icon: Heart, href: "/dashboard/wishlist", label: "Wishlist" },
    { icon: Envelope, href: "/dashboard/payments", label: "Payment History" },
    { icon: Person, href: "/dashboard/profile", label: "Profile" },
  ];

  const sellerMenu = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: Briefcase, href: "/dashboard/add-product", label: "Add Product" },
    { icon: ShoppingBasket, href: "/dashboard/my-products", label: "My Products" },
    { icon: ShoppingCart, href: "/dashboard/manage-orders", label: "Manage Orders" },
    { icon: ChartColumn, href: "/dashboard/analytics", label: "Analytics" },
  ];

  const adminMenu = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/users", label: "Manage Users" },
    { icon: ShoppingBasket, href: "/dashboard/products", label: "Manage Products" },
    { icon: ShoppingCart, href: "/dashboard/orders", label: "Manage Orders" },
    { icon: ChartColumn, href: "/dashboard/analytics", label: "Analytics" },
  ];

  let navItems = buyerMenu;

  if (mockUserRole === "seller") navItems = sellerMenu;
  if (mockUserRole === "admin") navItems = adminMenu;

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-default"
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r p-4 lg:block">
        {navContent}
      </aside>

      <Drawer>
        <Button className="my-2 mx-2 lg:hidden" variant="secondary">
          <Bars></Bars>
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Dashboard Menu</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}