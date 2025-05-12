import React from "react";
import { SummaryCards } from "./widgets/SummaryCards.jsx";
import { SinistreList } from "./widgets/PolicyList.jsx";
import { RecentClaims } from "./widgets/RecentClaims.jsx";
import { PaymentInfo } from "./widgets/PaymentInfo.jsx";
export const MyDashboardLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Dashboard Overview
            </h1>
            <SummaryCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <SinistreList />
                <div className="mt-6">
                  <RecentClaims />
                </div>
              </div>
              <div>
                <PaymentInfo />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
