import React from 'react';
import SpecificDetails from './SpecificDetails';

const GeneralInformation = ({ formData, setFormData, Verify }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Informations Générales
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="objectSinistre" className="block text-sm font-medium text-gray-700">
            Objet du sinistre
          </label>
          <input
            type="text"
            id="objectSinistre"
            name="objectSinistre"
            value={formData.objectSinistre}
            onChange={(e) => setFormData({...formData, objectSinistre: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {Verify.objectSinistreVer && (
            <p className="text-red-500 text-sm">Veuillez entrer l'objet du sinistre</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="descriptionSinistre" className="block text-sm font-medium text-gray-700">
            Description détaillée
          </label>
          <textarea
            id="descriptionSinistre"
            name="descriptionSinistre"
            value={formData.descriptionSinistre}
            onChange={(e) => setFormData({...formData, descriptionSinistre: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Décrivez les circonstances du sinistre de manière détaillée..."
          />
          {Verify.descriptionSinistreVer && (
            <p className="text-red-500 text-sm">Veuillez décrire le sinistre</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Montant estimé (en TND)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {Verify.amountVer && (
            <p className="text-red-500 text-sm">Veuillez entrer un montant estimé</p>
          )}
        </div>
      </div>
      
      <SpecificDetails formData={formData} setFormData={setFormData} Verify={Verify} />
    </div>
  );
};

export default GeneralInformation;