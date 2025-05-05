import React, { useEffect, useState } from "react";
import axios from "axios";

interface Reclamation {
  id: number;
  Email: string;
  fullName: string;
  Description: string;
  status: string;
  type: string;
  date: string;
  imageUrl: string[];
}

export const RecentClaims: React.FC = () => {
  const [claims, setClaims] = useState<Reclamation[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/reclamation/getusersrelamations")
      .then((response) => {
        setClaims(response.data);
      })
      .catch((error) => {
        console.error("Error fetching claims:", error);
      });
  }, []);

  // Limit the claims to the first 5
  const limitedClaims = claims.slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claim ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {limitedClaims.map((claim) => (
            <tr key={claim.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                {claim.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {claim.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {claim.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    claim.status.toLowerCase() === "approved"
                      ? "bg-green-100 text-green-800"
                      : claim.status.toLowerCase() === "pending"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {claim.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(claim.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
