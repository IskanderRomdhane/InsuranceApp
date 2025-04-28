import React from "react";
import {
  CreditCardIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
export const PaymentInfo = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md relative overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">
          Demander de l'assistance
        </h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <h3 className="font-bold text-base">Assistance voyage</h3>
          <p className="text-gray-800">+33 1 11 11 11 11</p>
        </div>
        <div>
          <h3 className="font-bold text-base">Assistance auto</h3>
          <p className="text-gray-800">73451666</p>
        </div>
        <div>
          <h3 className="font-bold text-base">Assistance MRH</h3>
          <p className="text-gray-800">75 107 578</p>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gray-800 rotate-45 scale-150 translate-x-1/4 translate-y-1/4"></div>
      </div>
    </div>
  );
};
const TransactionItem = ({ date, description, amount, type }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`p-1.5 rounded-full ${
            type === "incoming" ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          {type === "incoming" ? (
            <ArrowDownIcon className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <ArrowUpIcon className="h-3.5 w-3.5 text-gray-600" />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-800">{description}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <span
        className={`text-sm font-medium ${
          type === "incoming" ? "text-green-600" : "text-gray-800"
        }`}
      >
        {type === "incoming" ? "+" : ""}
        {amount}
      </span>
    </div>
  );
};
