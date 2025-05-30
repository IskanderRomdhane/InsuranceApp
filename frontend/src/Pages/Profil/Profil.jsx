import React, { useEffect, useState, useRef } from "react";
import Default_pfp from "../../assets/Profile/Default_pfp.jpg";
import axios from "axios";
import { useProfile } from "./ProfilFunction";
const Profil = () => {
  const {
    donneesUtilisateur,
    chargement,
    erreur,
    fichierSelectionne,
    uploadReussi,
    refInputFichier,
    fetchUserData,
    uploadFile,
    handleFileChange,
    triggerFileInput,
  } = useProfile();
  console.log(donneesUtilisateur)
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChangementFichier = (event) => {
    const file = handleFileChange(event);
    if (file) {
      uploadFile(file);
    }
  };

  if (chargement) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{erreur}</p>
        </div>
      </div>
    );
  }
  const photoProfil = donneesUtilisateur?.profilePictureUrl || Default_pfp;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* En-tête du profil avec bannière */}
        <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 relative">
          {/* Photo de profil avec bouton de modification - structure complètement repensée */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              {/* Conteneur de l'image */}
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <img
                  src={photoProfil}
                  alt="Profil"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = Default_pfp;
                  }}
                />
              </div>

              {/* Bouton de téléversement - maintenant positionné en dehors de la bordure */}
              <button
                onClick={triggerFileInput}
                className="absolute bottom-3 right-0 bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-lg transition-colors duration-200 ease-in-out border-2 border-white"
                title="Changer la photo de profil"
                style={{ zIndex: 50 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Input fichier caché */}
              <input
                type="file"
                ref={refInputFichier}
                className="hidden"
                accept="image/*"
                onChange={handleChangementFichier}
              />
            </div>
          </div>
        </div>

        {/* Contenu du profil */}
        <div className="pt-20 px-8 pb-8">
          <div className="mb-6">
            {/* Informations utilisateur */}
            <h1 className="text-3xl font-bold text-gray-900">
              {donneesUtilisateur?.firstname} {donneesUtilisateur?.lastname}
            </h1>
            <p className="text-gray-600">@{donneesUtilisateur?.username}</p>
            <p className="mt-2 text-gray-700">{donneesUtilisateur?.email}</p>
          </div>

          {/* Détails utilisateur */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Informations personnelles
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Nom complet
                  </span>
                  <p className="mt-1 text-gray-900">
                    {donneesUtilisateur?.firstname}{" "}
                    {donneesUtilisateur?.lastname}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Adresse email
                  </span>
                  <p className="mt-1 text-gray-900">
                    {donneesUtilisateur?.email}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">CIN</span>
                  <p className="mt-1 text-gray-900">
                    {donneesUtilisateur?.cin || "Non fourni"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Adresse
                  </span>
                  <p className="mt-1 text-gray-900">
                    {donneesUtilisateur?.adresse || "Non fournie"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Informations du compte
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Nom d'utilisateur
                  </span>
                  <p className="mt-1 text-gray-900">
                    @{donneesUtilisateur?.username}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Statut du compte
                  </span>
                  <div className="mt-1 flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                    <p className="text-gray-900">Actif</p>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
