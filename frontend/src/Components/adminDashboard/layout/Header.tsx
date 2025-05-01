import React from "react";
import { BellIcon, MenuIcon, SearchIcon, SettingsIcon } from "lucide-react";
interface HeaderProps {
  onMenuButtonClick: () => void;
}
export const Header = ({ onMenuButtonClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onMenuButtonClick}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="ml-2 md:ml-0">
            <h1 className="text-lg font-semibold text-gray-900">
              Insurance Admin
            </h1>
          </div>
        </div>
        <div className="hidden md:flex items-center rounded-md bg-gray-100 px-3 py-1.5 w-64">
          <SearchIcon className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-0 focus:outline-none flex-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none">
            <BellIcon className="h-5 w-5" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none">
            <SettingsIcon className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};
