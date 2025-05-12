import React from "react";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

export const StatCard = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
