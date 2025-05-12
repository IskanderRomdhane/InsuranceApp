import React, { useEffect, useState } from "react";
import { sinistreTable } from "./DashboardManagment";

export const PolicyTable = () => {
  const [sinistres, setSinistres] = useState([]); // Removed the type annotation
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Set the error to null instead of a string

  useEffect(() => {
    const fetchSinistres = async () => {
      try {
        const data = await sinistreTable();
        console.log("Fetched Sinistres:", data);
        setSinistres(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching sinistres");
        setLoading(false);
      }
    };

    fetchSinistres();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sinistre ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
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
          {sinistres.map((sinistre) => (
            <tr key={sinistre.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                CLM-{sinistre.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {sinistre.userId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {sinistre.categorie}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {sinistre.amount}$
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sinistre.etat === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : sinistre.etat === "UNDER_REVIEW"
                      ? "bg-blue-100 text-blue-800"
                      : sinistre.etat === "ACCEPTED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {sinistre.etat}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(sinistre.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
