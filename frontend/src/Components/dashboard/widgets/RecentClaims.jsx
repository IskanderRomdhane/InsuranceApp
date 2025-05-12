import React, { useEffect, useState } from "react";
import { ClockIcon, CheckCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { getusersrelamations } from "./dashboardManagment";

export const RecentClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getusersrelamations();
        setClaims(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réclamations :",
          error
        );
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">
            Réclamations récentes
          </h2>
          <Link
            to="/reclamations/deposer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Déposer une nouvelle réclamation
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {claims.length > 0 ? (
          claims.slice(0, 3).map((claim) => (
            <div key={claim.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {claim.status === "FINISHED" && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                    {claim.status === "PENDING" && (
                      <ClockIcon className="h-5 w-5 text-amber-500" />
                    )}
                    {claim.status === "UNDER_REVIEW" && (
                      <CheckCircleIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">
                        {claim.description}
                      </p>
                      <span className="ml-2 text-xs text-gray-500">
                        CLM-{claim.id}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Déposé le {claim.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {claim.amount}
                  </p>
                  <span
                    className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      claim.statusColor === "green"
                        ? "bg-green-100 text-green-800"
                        : claim.statusColor === "amber"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-center text-gray-500">
            Aucune réclamation trouvée.
          </div>
        )}
      </div>
      <div className="px-6 py-3 bg-gray-50 text-center">
        <Link
          to="/reclamations/consulter"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Voir toutes les réclamations
        </Link>
      </div>
    </div>
  );
};
