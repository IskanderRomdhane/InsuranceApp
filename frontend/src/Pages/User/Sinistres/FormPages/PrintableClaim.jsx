import React, { useEffect, useRef } from 'react';
const PrintableClaim = ({ formData }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render different details based on insurance type
  const renderTypeSpecificDetails = () => {
    switch(formData.type_sinistre.toLowerCase()) {
      case 'automobile':
        return (
          <>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Immatriculation:</span>
              <p>{formData.Matricule || 'Non spécifié'}</p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Lieu de l'accident:</span>
              <p>{formData.Location || 'Non spécifié'}</p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Montant estimé:</span>
              <p>{formData.amount ? `${formData.amount} €` : 'Non spécifié'}</p>
            </div>
          </>
        );
      
      case 'habitation':
        return (
          <>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Adresse du bien:</span>
              <p>{formData.propertyAddress || 'Non spécifié'}</p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Type de dommage:</span>
              <p>{formData.damageType || 'Non spécifié'}</p>
            </div>
          </>
        );
      
      case 'sante':
        return (
          <>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Établissement de santé:</span>
              <p>{formData.hospitalName || 'Non spécifié'}</p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Diagnostic:</span>
              <p>{formData.diagnosis || 'Non spécifié'}</p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Type de prise en charge:</span>
              <p>{formData.isCashless ? 'Tiers payant' : 'Remboursement'}</p>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500">Montant:</span>
              <p>{formData.amount ? `${formData.amount} €` : 'Non spécifié'}</p>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="printable-claim-document">
      {/* Logo and header - shown only in print */}
      <div className="print-only mb-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-800">AssurConnect</h1>
          <p className="text-sm text-gray-500">Votre partenaire assurance</p>
        </div>
        <div className="border-b border-gray-300 mb-6"></div>
      </div>

      {/* Document title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Confirmation de déclaration de sinistre</h1>
        <p className="text-sm text-gray-500">Document généré le {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Claim summary box */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left mb-6">
        <h2 className="text-lg font-bold mb-4 text-blue-800">Récapitulatif du sinistre</h2>
        
        {/* Main claim details */}
        <div className="space-y-3">
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-500">Référence du sinistre:</span>
            <p className="font-medium text-blue-600">{formData.claimReference || 'En cours de génération'}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-500">Type de sinistre:</span>
            <p>{formData.type_sinistre}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-500">Objet:</span>
            <p>{formData.objectSinistre || 'Non spécifié'}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-500">Description:</span>
            <p>{formData.descriptionSinistre || 'Non spécifié'}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-500">Date de soumission:</span>
            <p>{formData.submissionDate ? formatDate(formData.submissionDate) : new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-500">Statut:</span>
            <p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {formData.status || 'En attente'}
              </span>
            </p>
          </div>
          
          {/* Render insurance-specific details */}
          {renderTypeSpecificDetails()}
        </div>
      </div>

      {/* Footer information */}
      <div className="mt-8 text-sm text-gray-600">
        <p className="mb-2">Pour toute question concernant votre sinistre, veuillez contacter notre service client:</p>
        <p>Email: service.sinistres@assurconnect.fr</p>
        <p>Téléphone: 01 23 45 67 89</p>
        <p className="mt-4 text-xs text-gray-500">Ce document sert de récépissé pour votre déclaration de sinistre et ne constitue pas une acceptation de prise en charge.</p>
      </div>

      {/* Print-only page number */}
      <div className="print-only fixed bottom-4 right-4 text-xs text-gray-400">
        Page 1/1
      </div>
    </div>
  );
};

export default PrintableClaim;