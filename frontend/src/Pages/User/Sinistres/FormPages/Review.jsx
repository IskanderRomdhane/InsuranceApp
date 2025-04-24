
import React ,{ useEffect } from 'react'
import axios, { Axios } from 'axios';
const Review = ({ formData, setFormData, Verify }) => {
  const displayField = (value) => {
    if (value === true) return "Oui";
    if (value === false) return "Non";
    if (value === "") return "-";
    return value;
  };

  useEffect( () => {
    console.log(formData)
  })

  const renderSpecificFields = () => {
    switch(formData.type_sinistre) {
      case 'Automobile':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Immatriculation:</span>
                <p className="mt-1">{displayField(formData.Matricule)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Type de dommage:</span>
                <p className="mt-1">{displayField(formData.damageType)}</p>
              </div>
            </div>
          </div>
        );
      
      case 'Habitation':
        return (
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Adresse du bien:</span>
              <p className="mt-1">{displayField(formData.propertyAddress)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Type de dommage:</span>
              <p className="mt-1">{displayField(formData.damageType)}</p>
            </div>
          </div>
        );
      
      case 'Sante':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Établissement de santé:</span>
                <p className="mt-1">{displayField(formData.hospitalName)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Prise en charge sans avance:</span>
                <p className="mt-1">{displayField(formData.isCashless)}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Diagnostic/Raison des soins:</span>
              <p className="mt-1">{displayField(formData.diagnosis)}</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Résumé de votre déclaration
      </h2>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Informations personnelles</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Prénom:</span>
              <p className="mt-1">{displayField(formData.firstname)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Nom:</span>
              <p className="mt-1">{displayField(formData.lastname)}</p>
            </div>
          </div>
        </div>
        
        {/* General Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Informations générales</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Type de sinistre:</span>
              <p className="mt-1">{displayField(formData.type_sinistre)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Objet du sinistre:</span>
              <p className="mt-1">{displayField(formData.objectSinistre)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Description:</span>
              <p className="mt-1">{displayField(formData.descriptionSinistre)}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Montant estimé (TND):</span>
                <p className="mt-1">{displayField(formData.amount)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Lieu de l'incident:</span>
                <p className="mt-1">{displayField(formData.Location)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Specific Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Informations spécifiques</h3>
          {renderSpecificFields()}
        </div>
        
        {/* Documents Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Documents</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Documents justificatifs:</span>
              <p className="mt-1">{formData.documentsUploaded ? "Téléchargés" : "Non téléchargés"}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Photos du sinistre:</span>
              <p className="mt-1">{formData.imagesUploaded ? "Téléchargées" : "Non téléchargées"}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Veuillez vérifier attentivement toutes les informations avant de soumettre votre déclaration. Une fois soumise, vous ne pourrez plus la modifier.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review