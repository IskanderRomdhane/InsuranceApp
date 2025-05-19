import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Calendar, ChevronLeft, AlertCircle, Mail, User, Tag, Check} from "lucide-react";
import { useReclamationDetails } from './ReclamationFunctionAdmin';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import {getStatusStyle , formatDate , getStatusIcon} from './ReclamationDetailsProp'
const ReclamationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    reclamation,
    statut,
    isLoading,
    error,
    activeImage,
    setActiveImage,
    setStatut,
    updateStatus
  } = useReclamationDetails(id);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
          <div className="flex items-center text-red-600 mb-6">
            <AlertCircle className="w-10 h-10 mr-3" />
            <h3 className="text-2xl font-bold">Erreur</h3>
          </div>
          <p className="text-gray-600 mb-6 text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Retour aux réclamations
          </button>
        </div>
      </div>
    );
  }

  if (!reclamation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Aucune réclamation trouvée</p>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(reclamation.status);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
                aria-label="Retour"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Réclamation</h1>
                <p className="text-sm text-gray-500">Soumise le {formatDate(reclamation.date)}</p>
              </div>
            </div>
            
            <div className={`mt-4 sm:mt-0 flex items-center px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.border}`}>
              <span className={`mr-2 ${statusStyle.text}`}>
                {getStatusIcon(reclamation.status)}
              </span>
              <span className={`font-medium ${statusStyle.text}`}>
                {reclamation.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Client info */}
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
                    <p className="text-gray-800">{formatDate(reclamation.date)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status update section */}
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
                    onClick={() => updateStatus(statut)}
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                  >
                    {isLoading ? "Mise à jour..." : (
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
          
          {/* Right column - Description and images */}
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
                      src={activeImage} 
                      alt="Pièce jointe" 
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                  </div>
                  
                  {reclamation.imageUrl.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {reclamation.imageUrl.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(img)}
                          className={`rounded-lg overflow-hidden border-2 ${
                            activeImage === img ? 'border-blue-500' : 'border-transparent'
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