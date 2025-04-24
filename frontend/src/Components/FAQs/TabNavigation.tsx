import React from "react";
import {
  HelpCircleIcon,
  BookOpenIcon,
  FileTextIcon,
  BookIcon,
} from "lucide-react";
interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export const TabNavigation = ({
  activeTab,
  setActiveTab,
}: TabNavigationProps) => {
  const tabs = [
    {
      id: "faqs",
      label: "FAQs",
      icon: <HelpCircleIcon size={18} />,
    },
    {
      id: "tutorials",
      label: "Tutorials",
      icon: <BookOpenIcon size={18} />,
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileTextIcon size={18} />,
    },
    {
      id: "lexique",
      label: "Lexique",
      icon: <BookIcon size={18} />,
    },
  ];
  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-white rounded-lg shadow-md flex flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 sm:px-8 sm:py-4 sm:text-base
              ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-500 border-b-2 border-transparent"
              }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
