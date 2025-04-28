import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar, ChevronLeft, AlertCircle, Mail,
  User, Tag, Check, Clock3, XCircle, CheckCircle
} from "lucide-react";
import axios from "axios";

const ReclamationDetails = () => {
  const [reclamation, setReclamation] = useState(null);
  const [statut, setStatut] = useState("EN_ATTENTE");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [imageActive, setImageActive] = useState(null);
  const { id } = useParams();
  const naviguer = useNavigate();

  useEffect(() => {
    const chargerDetailsReclamation = async () => {
      try {
        const reponse = await axios.get(`http://localhost:8081/api/reclamation/getreclamation/${id}`);
        const donnees = reponse.data;
        setReclamation(donnees);
        setStatut(donnees.status);
        if (donnees.imageUrl?.length > 0) {
          setImageActive(donnees.imageUrl[0]);
        }
      } catch (erreur) {
        setErreur("Impossible de récupérer les détails de la réclamation");
        console.error(erreur);
      } finally {
        setChargement(false);
      }
    };

    if (id) chargerDetailsReclamation();
  }, [id]);

  const mettreAJourStatut = async () => {
    try {
      setChargement(true);
      await axios.put(
        `http://localhost:8081/api/reclamation/changerstatus/${id}`,
        { status: statut },
        { headers: { "Content-Type": "application/json" } }
      );
      setReclamation(prev => ({ ...prev, status: statut }));
    } catch (erreur) {
      setErreur("Échec de la mise à jour du statut");
      console.error(erreur);
    } finally {
      setChargement(false);
    }
  };

  const getIconeStatut = (statut) => {
    switch (statut) {
      case "EN_ATTENTE": return <Clock3 className="w-5 h-5" />;
      case "EN_COURS": return <AlertCircle className="w-5 h-5" />;
      case "ANNULEE": return <XCircle className="w-5 h-5" />;
      case "TERMINEE": return <CheckCircle className="w-5 h-5" />;
      default: return <Clock3 className="w-5 h-5" />;
    }
  };

  const getStyleStatut = (statut) => {
    const styles = {
      EN_ATTENTE: { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
      EN_COURS: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
      ANNULEE: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
      TERMINEE: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
    };
    return styles[statut] || styles["EN_ATTENTE"];
  };

  const formaterDate = (dateString) => {
    if (!dateString) return "Non disponible";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (chargement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-700"></div>
          <p className="mt-4 text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
          <div className="flex items-center text-red-600 mb-6">
            <AlertCircle className="w-10 h-10 mr-3" />
            <h3 className="text-2xl font-bold">Erreur</h3>
          </div>
          <p className="text-gray-600 mb-6 text-lg">{erreur}</p>
          <button
            onClick={() => naviguer(-1)}
            className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Retour aux réclamations
          </button>
        </div>
      </div>
    );
  }

  const styleStatut = getStyleStatut(reclamation.status);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <button
                onClick={() => naviguer(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
                aria-label="Retour"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Réclamation #{reclamation.id}</h1>
                <p className="text-sm text-gray-500">Soumise le {formaterDate(reclamation.date)}</p>
              </div>
            </div>
            
            <div className={`mt-4 sm:mt-0 flex items-center px-4 py-2 rounded-full ${styleStatut.bg} ${styleStatut.border}`}>
              <span className={`mr-2 ${styleStatut.text}`}>
                {getIconeStatut(reclamation.status)}
              </span>
              <span className={`font-medium ${styleStatut.text}`}>
                {reclamation.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Informations client */}
          <section className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Informations client</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-start">
                  <User className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nom complet</p>
                    <p className="text-gray-800">{reclamation.fullName}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-800">{reclamation.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Tag className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type de réclamation</p>
                    <p className="text-gray-800">{reclamation.type?.replace("_", " ")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date de soumission</p>
                    <p className="text-gray-800">{formaterDate(reclamation.date)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section mise à jour statut */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Mettre à jour le statut</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <select
                    value={statut}
                    onChange={(e) => setStatut(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="PENDING">En attente</option>
                    <option value="UNDER_REVIEW">En cours</option>
                    <option value="CANCELLED">Annulée</option>
                    <option value="FINISHED">Terminée</option>
                  </select>
                  
                  <button
                    onClick={mettreAJourStatut}
                    disabled={chargement}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                  >
                    {chargement ? "Mise à jour..." : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Mettre à jour
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Colonne droite - Description et images */}
          <section className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Description de la réclamation</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {reclamation.description || "Aucune description fournie."}
                </p>
              </div>
            </div>
            
            {/* Images */}
            {reclamation.imageUrl?.length > 0 && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Pièces jointes</h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={imageActive} 
                      alt="Pièce jointe" 
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                  </div>
                  
                  {reclamation.imageUrl.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {reclamation.imageUrl.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setImageActive(img)}
                          className={`rounded-lg overflow-hidden border-2 ${
                            imageActive === img ? 'border-blue-500' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`Pièce jointe ${index + 1}`} 
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ReclamationDetails;