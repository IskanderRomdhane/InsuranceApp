"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  AlertCircle,
  ChevronLeft,
  User,
  Mail,
  UserCheck,
  UserX,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { userManagement } from "./userManagement";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userManagement(id);
        setUser(data);
      } catch (error) {
        setError("Impossible de récupérer les détails de l'utilisateur");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Non disponible";
    return new Date(dateString).toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleUserStatus = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:8081/api/user/${id}/status?active=${!user.active}`;
      const response = await axios.put(url);
      setUser(response.data);
    } catch (error) {
      console.error(
        "Échec de la mise à jour du statut de l'utilisateur",
        error
      );
      alert("Erreur lors de la mise à jour du statut de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">Erreur survenue</h2>
            </div>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <p className="text-gray-600 mb-6">
              Nous n'avons pas pu récupérer les détails de l'utilisateur
              demandé. Veuillez réessayer ou contacter le support si le problème
              persiste.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200 flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Profil Utilisateur
            </h1>
            <p className="text-gray-500">Détails de l'utilisateur #{user.id}</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-t-blue-500">
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.firstname || ""} {user.lastname || ""}
                </h2>
                <div className="flex items-center mt-1 text-gray-500">
                  <Mail className="w-4 h-4 mr-1" />
                  {user.email || "Aucun email disponible"}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.active ? "Actif" : "Inactif"}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Informations du Compte
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">
                        Nom d'utilisateur
                      </p>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <p className="font-medium">
                          {user.username || "Non défini"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Rôle</p>
                      <p className="font-medium">
                        {user.role || "UTILISATEUR"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Détails Personnels
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Prénom</p>
                      <p className="font-medium">
                        {user.firstname || "Non fourni"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Nom</p>
                      <p className="font-medium">
                        {user.lastname || "Non fourni"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Compte créé le</p>
                <p className="font-medium">{formatDate(user.createdDate)}</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              onClick={toggleUserStatus}
              className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                user.active
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : user.active ? (
                <UserX className="w-4 h-4 mr-2" />
              ) : (
                <UserCheck className="w-4 h-4 mr-2" />
              )}
              {user.active
                ? "Désactiver l'utilisateur"
                : "Activer l'utilisateur"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
