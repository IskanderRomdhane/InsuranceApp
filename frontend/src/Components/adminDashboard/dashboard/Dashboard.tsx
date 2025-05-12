import React, { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { PolicyTable } from "./PolicyTable";
import { RecentClaims } from "./RecentClaims";
import { SinistreChart } from "./RevenueChart";
import { PolicyDistributionChart } from "./PolicyDistributionChart";
import { ClaimsTrendChart } from "./ClaimsTrendChart";
import { UsersIcon, FileTextIcon, AlertCircleIcon } from "lucide-react";
import axios from "axios";

export const MyDashboard = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [acceptedSinistres, setAcceptedSinistres] = useState<number | null>(
    null
  );
  const [pendingSinistres, setPendingSinistres] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"policies" | "claims">("policies");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/user/count")
      .then((res) => setUserCount(res.data))
      .catch((err) =>
        console.error("Échec de la récupération du nombre d'utilisateurs", err)
      );

    axios
      .get("http://localhost:8081/api/sinistre/count/accepted")
      .then((res) => setAcceptedSinistres(res.data))
      .catch((err) =>
        console.error("Échec de la récupération des sinistres acceptés", err)
      );

    axios
      .get("http://localhost:8081/api/sinistre/count/pending")
      .then((res) => setPendingSinistres(res.data))
      .catch((err) =>
        console.error("Échec de la récupération des sinistres en attente", err)
      );
  }, []);

  return (
    <div className="space-y-6">
      {/* Cartes de Statistiques */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Nombre total de clients"
          value={
            userCount !== null ? userCount.toLocaleString() : "Chargement..."
          }
          change="+12.5%"
          trend="up"
          icon={<UsersIcon className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Sinistres actifs"
          value={
            acceptedSinistres !== null
              ? acceptedSinistres.toLocaleString()
              : "Chargement..."
          }
          change="+8.2%"
          trend="up"
          icon={<FileTextIcon className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Sinistres en attente"
          value={
            pendingSinistres !== null
              ? pendingSinistres.toLocaleString()
              : "Chargement..."
          }
          change="-3.1%"
          trend="down"
          icon={<AlertCircleIcon className="h-6 w-6 text-amber-600" />}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Sinistre par mois
          </h2>
          <SinistreChart />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition des sinistres
          </h2>
          <PolicyDistributionChart />
        </div>
      </div>

      {/* Onglets pour Polices & Sinistres */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Reclamations & Sinistres
          </h2>
          <div className="mt-2 flex space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab("policies")}
              className={`px-4 py-2 rounded ${
                activeTab === "policies"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Sinistres récentes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("claims")}
              className={`px-4 py-2 rounded ${
                activeTab === "claims"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Reclamations récents
            </button>
          </div>
        </div>
        <div className="p-6">
          {activeTab === "policies" ? <PolicyTable /> : <RecentClaims />}
        </div>
      </div>
    </div>
  );
};
