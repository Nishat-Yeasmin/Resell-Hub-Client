'use client';

import React from 'react';

import {useSession} from "@/lib/auth-client";
import {
    FileText,
    Persons,
    Thunderbolt,
   CircleCheck,
} from "@gravity-ui/icons";
import { DashboardStats } from '@/components/dashboard/DashboardStats';




const recruiterStats = [
    {
        title: "Total Products",
        value: 1248,
        icon: FileText,
    },
    {
        title: "Total Sales",
        value: 48,
        icon: Persons,
    },
    {
        title: "Total Revenue ",
        value: 18,
        icon: Thunderbolt,
    },
    {
        title: "Pending Orders ",
        value: 32,
        icon: CircleCheck,
    },
];


const SellerDashboardHomePage = () => {
   const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  if (!session) return <div>Please Login</div>;

  if (session.user.role !== "seller") {
    return <div>Access Denied</div>;
  }


    

    return (
        <div>
            <h1 className='text-4xl font-semibold'>Welcome Back, {session?.user?.name}</h1>

              {/* Stats Cards */}
            <DashboardStats statsData={recruiterStats}></DashboardStats>

        </div>
    );
};

export default SellerDashboardHomePage;