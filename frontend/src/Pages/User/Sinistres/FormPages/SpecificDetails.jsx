import React from 'react'

const SpecificDetails = ({ formData, setFormData, Verify }) => {
  // Render different form fields based on the selected type of sinistre
  const renderSpecificFields = () => {
    switch(formData.type_sinistre) {
      case 'automobile':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">
                Numéro d'immatriculation
              </label>
              <input
                type="text"
                id="matricule"
                name="matricule"
                value={formData.Matricule}
                onChange={(e) => setFormData({...formData, Matricule: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="***-TUN-***"
              />
              {Verify.MatriculeVer && (
                <p className="text-red-500 text-sm">Veuillez entrer le numéro d'immatriculation</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="damageType" className="block text-sm font-medium text-gray-700">
                Type de dommage
              </label>
              <select
                id="damageType"
                name="damageType"
                value={formData.damageType}
                onChange={(e) => setFormData({...formData, damageType: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="Collision avec un autre véhicule">Collision avec un autre véhicule</option>
                <option value="Accident sans tiers">Accident sans tiers</option>
                <option value="Véhicule volé">Véhicule volé</option>
                <option value="Incendie véhicule">Incendie du véhicule</option>
                <option value="Vandalisme">Vandalisme</option>
                <option value="Bris de glace (pare-brise, vitres)">Bris de glace (pare-brise, vitres)</option>
                <option value="Catastrophe naturelle (inondation, tempête...)">Catastrophe naturelle (inondation, tempête...)</option>
                <option value="Autre">Autre</option>

              </select>
              {Verify.damageTypeVer && (
                <p className="text-red-500 text-sm">Veuillez sélectionner le type de dommage</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Lieu de l'Accident
              </label>
              <input
                type="text"
                id="matricule"
                name="matricule"
                value={formData.Location}
                onChange={(e) => setFormData({...formData, Location: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
              {Verify.MatriculeVer && (
                <p className="text-red-500 text-sm">Veuillez entrer le Lieu de l'Accident</p>
              )}
            </div>
          </div>
        );
      
      case 'habilitation':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">
                Adresse complète du bien
              </label>
              <textarea
                id="propertyAddress"
                name="propertyAddress"
                rows={3}
                value={formData.propertyAddress}
                onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Appartement 5, Immeuble B, 123 Rue Hassan II, Tunis"
              />
              {Verify.propertyAddressVer && (
                <p className="text-red-500 text-sm">Veuillez entrer l'adresse complète</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="damageType" className="block text-sm font-medium text-gray-700">
                Type de dommage
              </label>
              <select
                id="damageType"
                name="damageType"
                value={formData.damageType}
                onChange={(e) => setFormData({...formData, damageType: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="Inondation / Dégât des eaux">Inondation / Dégât des eaux</option>
                <option value="Incendie domestique">Incendie domestique</option>
                <option value="Cambriolage ou effraction">Cambriolage ou effraction</option>
                <option value="Catastrophe naturelle (séisme, tempête...)">Catastrophe naturelle (séisme, tempête...)</option>
                <option value="Dommage électrique (court-circuit, surtension)">Dommage électrique (court-circuit, surtension)</option>
                <option value="Vandalisme / dégradation">Vandalisme / dégradation</option>
                <option value="Bris de glace (fenêtre, baie vitrée...)">Bris de glace (fenêtre, baie vitrée...)</option>
                <option value="Autre">Autre</option>

              </select>
              {Verify.damageTypeVer && (
                <p className="text-red-500 text-sm">Veuillez sélectionner le type de dommage</p>
              )}
            </div>
          </div>
        );
      
      case 'sante':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                Nom de l'établissement de santé
              </label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                
              />
              {Verify.hospitalNameVer && (
                <p className="text-red-500 text-sm">Veuillez entrer le nom de l'établissement</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                Diagnostic/Raison des soins
              </label>
              <textarea
                id="diagnosis"
                name="diagnosis"
                rows={3}
                value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Fracture du poignet, Intervention chirurgicale..."
              />
              {Verify.diagnosisVer && (
                <p className="text-red-500 text-sm">Veuillez indiquer le diagnostic ou la raison des soins</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="isCashless"
                  name="isCashless"
                  type="checkbox"
                  checked={formData.isCashless}
                  onChange={(e) => setFormData({...formData, isCashless: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isCashless" className="ml-2 block text-sm text-gray-700">
                  Prise en charge sans avance de frais
                </label>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-6">
            <p className="text-red-500">Veuillez d'abord sélectionner un type de sinistre</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderSpecificFields()}
    </div>
  )
}

export default SpecificDetails;