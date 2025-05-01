import React from "react";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  BarChartIcon,
  ShieldIcon,
  AlertCircleIcon,
  SettingsIcon,
  HelpCircleIcon,
  XIcon,
} from "lucide-react";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigation = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Customers",
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Policies",
      icon: FileTextIcon,
      current: false,
    },
    {
      name: "Claims",
      icon: AlertCircleIcon,
      current: false,
    },
    {
      name: "Analytics",
      icon: BarChartIcon,
      current: false,
    },
    {
      name: "Risk Assessment",
      icon: ShieldIcon,
      current: false,
    },
    {
      name: "Settings",
      icon: SettingsIcon,
      current: false,
    },
    {
      name: "Help & Support",
      icon: HelpCircleIcon,
      current: false,
    },
  ];
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
              <ShieldIcon className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">
              InsureAdmin
            </span>
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                item.current
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  item.current
                    ? "text-indigo-500"
                    : "text-gray-500 group-hover:text-gray-600"
                }`}
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
