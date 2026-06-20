"use client";

import React from "react";
import { Card, CardContent } from "@heroui/react";

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="border border-default-200 shadow-sm">
      <CardContent className=" p-5">

         {Icon && (
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center">
                <Icon width={20} height={20} />
            </div>
         )}
        {/* Left Side */}
        <div>
          <p className="text-sm text-gray-400 my-4">
            {title}
          </p>

          <h2 className="text-2xl ">
            {value}
          </h2>
        </div>

        

      </CardContent>
    </Card>
  );
};

export default StatsCard;