import React from "react";
import { StatCard } from "./StatCard";
import { PolicyTable } from "./PolicyTable";
import { RecentClaims } from "./RecentClaims";
import { SinistreChart } from "./RevenueChart";
import { PolicyDistributionChart } from "./PolicyDistributionChart";
import { ClaimsTrendChart } from "./ClaimsTrendChart";
import {
  UsersIcon,
  FileTextIcon,
  AlertCircleIcon,
  DollarSignIcon,
} from "lucide-react";
export const MyDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value="15,342"
          change="+12.5%"
          trend="up"
          icon={<UsersIcon className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Active Policies"
          value="24,895"
          change="+8.2%"
          trend="up"
          icon={<FileTextIcon className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Pending Claims"
          value="348"
          change="-3.1%"
          trend="down"
          icon={<AlertCircleIcon className="h-6 w-6 text-amber-600" />}
        />
        <StatCard
          title="Monthly Revenue"
          value="$1.2M"
          change="+14.3%"
          trend="up"
          icon={<DollarSignIcon className="h-6 w-6 text-purple-600" />}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Overview
          </h2>
          <SinistreChart />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Policy Distribution
          </h2>
          <PolicyDistributionChart />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Claims Trend
        </h2>
        <ClaimsTrendChart />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Policies
            </h2>
          </div>
          <PolicyTable />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Claims
            </h2>
          </div>
          <RecentClaims />
        </div>
      </div>
    </div>
  );
};
