import React, { ReactNode } from "react";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon?: ReactNode;
}
export const StatCard = ({
  title,
  value,
  change,
  trend,
  icon,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <div className="flex items-center mt-2">
          {trend === "up" ? (
            <TrendingUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span
            className={`text-sm ml-1 ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} from last month
          </span>
        </div>
      </div>
    </div>
  );
};
