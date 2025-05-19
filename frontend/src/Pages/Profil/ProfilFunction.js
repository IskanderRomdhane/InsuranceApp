// profileService.js
import axios from "axios";
import axiosInstance from "../../Hooks/TokenInterceptor";
import { useEffect, useState,useRef  } from 'react';

export const useProfile = () => {
  const [donneesUtilisateur, setDonneesUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [fichierSelectionne, setFichierSelectionne] = useState(null);
  const [uploadReussi, setUploadReussi] = useState(false);
  const refInputFichier = useRef(null);
  const userId = localStorage.getItem("userId");

  const fetchUserData = async () => {
    setChargement(true);
    try {
      const url = `/api/user/userid/${userId}`;
      const reponse = await axiosInstance.get(url);
      const donnees = reponse.data;
      setDonneesUtilisateur(donnees);
      setChargement(false);
      return donnees;
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      setErreur("Échec du chargement du profil utilisateur");
      setChargement(false);
      throw error;
    }
  };

  const uploadFile = async (fichier) => {
    if (!fichier || !donneesUtilisateur) return;

    const formData = new FormData();
    formData.append("file", fichier);

    try {
      setUploadReussi(false);
      const reponse = await axiosInstance.put(
        `/api/user/uploadImage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (reponse.status === 200) {
        const updatedUserData = await fetchUserData();
        setUploadReussi(true);
        setTimeout(() => {
          setUploadReussi(false);
        }, 3000);
        return updatedUserData;
      }
    } catch (error) {
      console.error("Erreur lors du téléversement de l'image:", error);
      setErreur("Échec du téléversement de l'image");
      throw error;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFichierSelectionne(file);
    return file;
  };

  const triggerFileInput = () => {
    refInputFichier.current.click();
  };

  return {
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
  };
};