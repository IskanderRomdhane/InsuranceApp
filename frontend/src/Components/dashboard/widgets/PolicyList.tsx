import React, { useEffect, useState } from "react";
import { CheckCircleIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Define the Sinistre type
interface Sinistre {
  id: string;
  description: string;
  objectSinistre: string;
  etat: string;
  amount: number;
  date: string;
}

export const SinistreList = () => {
  const [sinistres, setSinistres] = useState<Sinistre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSinistres = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/sinistre/sinistres"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sinistres");
        }
        const data: Sinistre[] = await response.json();
        setSinistres(data.slice(0, 5));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSinistres();
  }, []);
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options); // 'en-GB' gives dd/mm/yyyy format
    return formattedDate;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Mes Sinistres</h2>
          <Link
            to="/sinistres/consulter"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Objet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mountant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sinistres.map((sinistre) => (
              <tr key={sinistre.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {sinistre.description}
                  </div>
                  <div className="text-xs text-gray-500">{sinistre.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {sinistre.objectSinistre}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircleIcon className="mr-1 h-3 w-3" />
                    {sinistre.etat}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sinistre.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    {formatDate(sinistre.date)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};