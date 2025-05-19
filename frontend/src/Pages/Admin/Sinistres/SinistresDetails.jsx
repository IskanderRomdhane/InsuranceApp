import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Image as ImageIcon, 
  Download, 
  AlertTriangle, 
  DollarSign, 
  Calendar, 
  Hash, 
  Car, 
  MapPin, 
  Cpu 
} from 'lucide-react';
import ReportModal from './ReportModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useSinistresDetails } from './useSinistreDetails';
const SinistresDetails = () => {
  const{
    claim, loading, error , activeImage, showModal , aiReport , aiLoading ,setShowModal, fetchClaimDetails , handleStatusChange , generateAIDecision
  } = useSinistresDetails() ;
  useEffect(() => {
    fetchClaimDetails()
    console.log(claim)
  },[])
  const navigate = useNavigate();

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusInFrench = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'ACCEPTÉ';
      case 'REJECTED': return 'REJETÉ';
      case 'PENDING': return 'EN ATTENTE';
      case 'UNDER_REVIEW': return 'EN COURS D\'EXAMEN';
      default: return status;
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'jpg': case 'jpeg': case 'png': case 'gif': return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case 'doc': case 'docx': return <FileText className="h-5 w-5 text-blue-600" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;
  if (error) return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm">
        <p className="font-semibold text-lg">Erreur</p>
        <p className="text-sm mt-1">{error}</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={() => navigate('/admin/sinistre')}>
          Retour à la liste des sinistres
        </button>
      </div>
    </div>
  );
  if (!claim) return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
        <p className="text-gray-600 text-lg">Aucun sinistre trouvé avec cet identifiant.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigate('/admin/sinistre')}>
          Retour à la liste des sinistres
        </button>
      </div>
    </div>
  );

  const hasImages = claim.images && claim.images.length > 0;
  const hasDocuments = claim.document && claim.document.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {showModal && <ReportModal setShowModal={setShowModal} handleStatusChange={handleStatusChange} aiReport={aiReport} />}
      <div className="max-w-6xl mx-auto p-6">
        <button 
          className="mb-6 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          onClick={() => navigate('/admin/sinistre')}
          title="Retour à la liste des sinistres"
          aria-label="Retour à la liste des sinistres"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>

        <div className="bg-[#3a5c54] rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-white mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-white">{claim.object || claim.objectSinistre}</h2>
              </div>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusBadgeColor(claim.etat)}`}>
              {getStatusInFrench(claim.etat)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations de base</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-500">Objet</span>
                  <span className="ml-auto font-medium text-gray-900">{claim.object || claim.objectSinistre}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-500">Montant</span>
                  <span className="ml-auto font-medium text-gray-900">{claim.amount?.toFixed(2) || '0.00'} TND</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="ml-auto font-medium text-gray-900">{new Date(claim.date).toLocaleDateString()}</span>
                </div>
                {claim.matricule && (
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-500">Immatriculation</span>
                    <span className="ml-auto font-medium text-gray-900">{claim.matricule}</span>
                  </div>
                )}
                {claim.location && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-500">Lieu</span>
                    <span className="ml-auto font-medium text-gray-900">{claim.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{claim.description || claim.descriptionSinistre}</p>
            </div>

            {hasImages && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 text-gray-600 mr-2" />
                  Photos
                </h3>
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <img src={activeImage} alt="Claim evidence" className="w-full h-80 object-contain bg-gray-50" />
                </div>
                {claim.images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {claim.images.map((image) => (
                      <div 
                        key={image.id} 
                        className={`w-20 h-20 rounded-lg border-2 cursor-pointer transition-all ${activeImage === image.imageUrl ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
                        onClick={() => setActiveImage(image.imageUrl)}
                      >
                        <img src={image.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

           
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <button 
                className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors flex justify-center items-center disabled:bg-blue-400"
                onClick={generateAIDecision}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Analyse...
                  </>
                ) : (
                  <>
                    <Cpu className="h-5 w-5 mr-2" />
                    Prendre décision
                  </>
                )}
              </button>
            </div>
            {hasDocuments && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 text-gray-600 mr-2" />
                  Documents
                </h3>
                <div className="space-y-4">
                  {claim.document.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {getFileIcon(doc.documentName)}
                        <span className="ml-3 font-medium text-gray-900">Documents</span>
                      </div>
                      <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="h-4 w-4 mr-2" /> Voir
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinistresDetails;