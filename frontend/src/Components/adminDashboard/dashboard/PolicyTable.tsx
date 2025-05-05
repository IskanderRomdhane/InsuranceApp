import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for SinistreDTO (or import it if it's defined elsewhere)
interface SinistreDTO {
  id: number;
  userId: number;
  objectSinistre: string;
  descriptionSinistre: string;
  categorie: string;
  amount: number;
  etat: string; // You can use enums here if necessary
  date: string; // This is a string in ISO format from the API
}

export const PolicyTable = () => {
  const [sinistres, setSinistres] = useState<SinistreDTO[]>([]); // Specify the type of sinistres
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSinistres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/sinistre/sinistres"
        );

        console.log("Fetched Sinistres:", response.data);
        setSinistres(response.data);
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
                {sinistre.userId}{" "}
                {/* Assuming 'userId' represents the customer */}
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
                {new Date(sinistre.date).toLocaleDateString()}{" "}
                {/* Format the date */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
