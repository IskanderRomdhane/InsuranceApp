import React from "react";
export const PolicyTable = () => {
  const policies = [
    {
      id: "POL-2023-78945",
      customer: "Michael Johnson",
      type: "Auto Insurance",
      premium: "$840",
      status: "Active",
      date: "12 Nov 2023",
    },
    {
      id: "POL-2023-78126",
      customer: "Sarah Williams",
      type: "Home Insurance",
      premium: "$1,240",
      status: "Active",
      date: "08 Nov 2023",
    },
    {
      id: "POL-2023-77439",
      customer: "David Brown",
      type: "Life Insurance",
      premium: "$1,800",
      status: "Pending",
      date: "05 Nov 2023",
    },
    {
      id: "POL-2023-77104",
      customer: "Emily Davis",
      type: "Health Insurance",
      premium: "$2,350",
      status: "Active",
      date: "01 Nov 2023",
    },
    {
      id: "POL-2023-76985",
      customer: "Robert Wilson",
      type: "Auto Insurance",
      premium: "$760",
      status: "Expired",
      date: "28 Oct 2023",
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
              Policy ID
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
              Premium
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
          {policies.map((policy) => (
            <tr key={policy.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                {policy.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {policy.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.premium}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    policy.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : policy.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {policy.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {policy.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
