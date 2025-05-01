import React, { useState } from "react";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export const AdminDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <Header onMenuButtonClick={() => setSidebarOpen(true)} /> */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};
