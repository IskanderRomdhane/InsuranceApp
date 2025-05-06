import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Image as ImageIcon, Download, XCircle } from 'lucide-react';
import axios from 'axios';
import ReportModal from './ReportModal';
const SinistresDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [aiReport, setAiReport] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchClaimDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/api/sinistre/getsinistre/id/${id}`);
        if (!response.ok) {
          throw new Error('Échec de récupération des détails du sinistre');
        }
        const data = await response.json();
        setClaim(data);
        console.log(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0].imageUrl);
        }
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les détails du sinistre. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClaimDetails();
    }
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      const url = `http://localhost:8081/api/sinistre/changeretat/${id}`;
      const response = await axios.put(
        url,
        {etat: status},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setClaim(prev => ({
          ...prev,
          etat: status
        }));
        setShowModal(false);
      } else {
        throw new Error('Échec de mise à jour du statut');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const generateAIDecision = async () => {
    setAiLoading(true);
    try {
      const url = `http://localhost:8081/api/model/generate-response/${claim.id}`;
      console.log(`Making request to: ${url}`);
      
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      
      if (response.status === 200) {
        // Extract the 'response' property from the API response object
        if (response.data && response.data.response) {
          setAiReport(response.data.response);
        } else {
          // Fallback in case the structure is different
          setAiReport(typeof response.data === 'string' 
            ? response.data 
            : JSON.stringify(response.data, null, 2));
        }
        
        setShowModal(true);
      } else {
        throw new Error(`Échec de génération du rapport: Status ${response.status}`);
      }
    } catch (err) {
      console.error('API Error:', err);
      setAiReport("Une erreur s'est produite lors de la génération du rapport.");
    } finally {
      setAiLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusInFrench = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'ACCEPTÉ';
      case 'REJECTED':
        return 'REJETÉ';
      case 'PENDING':
        return 'EN ATTENTE';
      case 'UNDER_REVIEW':
        return 'EN COURS D\'EXAMEN';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Erreur</p>
          <p className="text-sm">{error}</p>
          <button 
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => navigate('/admin/sinistre')}
          >
            Retour à la liste des sinistres
          </button>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">Aucun sinistre trouvé avec cet identifiant.</p>
          <button 
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate('/admin/sinistre')}
          >
            Retour à la liste des sinistres
          </button>
        </div>
      </div>
    );
  }

  const hasImages = claim.images && claim.images.length > 0;
  const hasDocuments = claim.document && claim.document.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Modal */}
      {showModal && <ReportModal 
      setShowModal = {setShowModal} 
      handleStatusChange = {handleStatusChange}
      aiReport={aiReport}
      />}

      <div className="mb-6">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/admin/sinistre')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Retour à la liste des sinistres</span>
        </button>
        <h1 className="text-2xl font-bold mt-2">Détails du sinistre</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">{claim.object || claim.objectSinistre}</h2>
            <p className="text-sm text-gray-500">ID: {claim.id}</p>
          </div>
          <div className="flex items-center">
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(claim.etat)}`}>
              {getStatusInFrench(claim.etat)}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Colonne gauche */}
        <div className="md:col-span-2 space-y-6">
          {/* Carte d'informations de base */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Informations de base</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Objet du sinistre</p>
                <p className="font-medium">{claim.object || claim.objectSinistre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Montant</p>
                <p className="font-medium">{claim.amount?.toFixed(2) || '0.00'} TND</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de soumission</p>
                <p className="font-medium">{new Date(claim.date).toLocaleDateString()} {new Date(claim.date).toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID du sinistre</p>
                <p className="font-medium">{claim.id}</p>
              </div>
              {claim.matricule && (
                <div>
                  <p className="text-sm text-gray-500">Immatriculation</p>
                  <p className="font-medium">{claim.matricule}</p>
                </div>
              )}
              {claim.location && (
                <div>
                  <p className="text-sm text-gray-500">Lieu</p>
                  <p className="font-medium">{claim.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Carte de description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{claim.description || claim.descriptionSinistre}</p>
          </div>

          {/* Section des images */}
          {hasImages && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">
                <div className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Photos justificatives
                </div>
              </h3>
              
              <div className="mt-4">
                {/* Affichage de l'image principale */}
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={activeImage} 
                    alt="Preuve du sinistre" 
                    className="w-full h-64 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/400/320";
                    }}
                  />
                </div>
                
                {/* Sélecteur de miniatures */}
                {claim.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {claim.images.map((image, index) => (
                      <div 
                        key={image.id} 
                        className={`w-16 h-16 rounded-md border-2 overflow-hidden cursor-pointer ${
                          activeImage === image.imageUrl ? 'border-blue-600' : 'border-gray-200'
                        }`}
                        onClick={() => setActiveImage(image.imageUrl)}
                      >
                        <img 
                          src={image.imageUrl} 
                          alt={`Miniature ${index + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/100/100";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section des documents */}
          {hasDocuments && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-600" />
                  Documents justificatifs
                </div>
              </h3>
              
              <div className="space-y-3">
                {claim.document.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium">{doc.documentName}</p>
                        <p className="text-xs text-gray-500">ID du document: {doc.id}</p>
                      </div>
                    </div>
                    <a 
                      href={doc.documentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Voir
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>

        {/* Colonne droite - actions et statut */}
        <div className="space-y-6">
          {/* Carte de statut */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Actions de statut</h3>
            <div className="space-y-3">
              <button 
                className="w-full py-2 px-4 rounded-md text-white font-medium bg-[#3a5c54] flex justify-center items-center"
                onClick={generateAIDecision}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Analyse en cours...
                  </>
                ) : (
                  'Prendre décision'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinistresDetails;