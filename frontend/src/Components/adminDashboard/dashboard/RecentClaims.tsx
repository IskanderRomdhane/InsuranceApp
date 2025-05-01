import React from "react";
export const RecentClaims = () => {
  const claims = [
    {
      id: "CLM-2023-4512",
      customer: "Jennifer Smith",
      type: "Auto Accident",
      amount: "$5,200",
      status: "In Review",
      date: "14 Nov 2023",
    },
    {
      id: "CLM-2023-4498",
      customer: "Thomas Anderson",
      type: "Property Damage",
      amount: "$8,750",
      status: "Approved",
      date: "10 Nov 2023",
    },
    {
      id: "CLM-2023-4475",
      customer: "Lisa Martinez",
      type: "Medical Expense",
      amount: "$3,450",
      status: "Rejected",
      date: "08 Nov 2023",
    },
    {
      id: "CLM-2023-4461",
      customer: "Kevin Taylor",
      type: "Theft",
      amount: "$1,800",
      status: "Approved",
      date: "05 Nov 2023",
    },
    {
      id: "CLM-2023-4452",
      customer: "Amanda Garcia",
      type: "Fire Damage",
      amount: "$12,500",
      status: "In Review",
      date: "02 Nov 2023",
    },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Claim ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {claims.map((claim) => (
            <tr key={claim.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                {claim.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {claim.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {claim.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {claim.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    claim.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : claim.status === "In Review"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {claim.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {claim.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
