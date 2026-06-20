"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
const {data:session, isPending} = useSession()
console.log("session data is navbar: ",session, "is pending: ", isPending)
const user = session?.user;
const handleSignOut = async()=>{
  await signOut();
}
  return (
    <nav className="sticky top-0 z-50 border-b bg-gray-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link href="/" className="text-2xl font-bold text-blue-600">
              ResellHub
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-600 text-sm">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-600 text-sm">
              Products
            </Link>
            <Link href="/categories" className="hover:text-blue-600 text-sm">
              Categories
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600 text-sm">
              Dashboard
            </Link>

            <div className="h-5 w-px bg-gray-300" />

            {/* Login / Register */}
           {
            user ?
             <>
             Hi, {user.name}!
             <Button onClick={handleSignOut} variant="ghost">Sign Out</Button>
            </>:
             <Link href="/auth/signin" className="text-sm text-blue-600">
              Login
            </Link>
           }

           <Link href="/auth/signup">
  <Button size="sm" color="primary">
    Register
  </Button>
</Link>

            {/* Profile Dropdown */}
            <div className="relative bg-gray-800">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-sm font-medium border px-3 py-1 rounded-md hover:bg-gray-800"
              >
                👤 Guest
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-600 border rounded-md shadow-md">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-500 text-sm"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-500 text-sm"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-500 text-sm"
                  >
                    Orders
                  </Link>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-500 text-sm text-red-500">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-2">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/products" className="block py-2">Products</Link>
          <Link href="/categories" className="block py-2">Categories</Link>
          <Link href="/dashboard" className="block py-2">Dashboard</Link>

          <div className="border-t pt-3 space-y-2">
            <Link href="/auth/signin" className="block text-blue-600">
              Login
            </Link>
           <Link href="/auth/signup">
  <Button size="sm" color="primary">
    Register
  </Button>
</Link>
          </div>
        </div>
      )}
    </nav>
  );
}