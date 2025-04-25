import React from 'react'
import { Car, Home, Heart } from 'lucide-react'

const SinistreType = ({ formData, setFormData, Verify, setVerify }) => {
  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      type_sinistre: category
    });
    
    // Clear the validation error when a selection is made
    if (Verify.type_sinistre) {
      setVerify({
        ...Verify,
        type_sinistre: false
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Type de Sinistre
      </h2>
      
      <div className="text-sm text-gray-600 mb-4">
        Veuillez sélectionner le type de sinistre que vous souhaitez déclarer
      </div>
      
      <div className="space-y-4">
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.type_sinistre === 'automobile' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-300'
          } ${Verify.type_sinistre && !formData.type_sinistre ? 'border-red-300' : ''}`}
          onClick={() => handleCategoryChange('automobile')}
        >
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              formData.type_sinistre === 'automobile' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Car className="h-6 w-6 text-sky-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Automobile</h3>
              <p className="text-sm text-gray-500">Accidents, vols ou dommages liés à votre véhicule</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.type_sinistre === 'habilitation' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-300'
          } ${Verify.type_sinistre && !formData.type_sinistre ? 'border-red-300' : ''}`}
          onClick={() => handleCategoryChange('habilitation')}
        >
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              formData.type_sinistre === 'habilitation' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Home className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Habitation</h3>
              <p className="text-sm text-gray-500">Dommages à votre domicile ou propriété</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            formData.type_sinistre === 'sante' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-300'
          } ${Verify.type_sinistre && !formData.type_sinistre ? 'border-red-300' : ''}`}
          onClick={() => handleCategoryChange('sante')}
        >
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              formData.type_sinistre === 'sante' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Santé</h3>
              <p className="text-sm text-gray-500">Frais médicaux, hospitalisations ou soins de santé</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinistreType;