import React, { useState, useEffect } from 'react'

const UploadFiles = ({ formData, setFormData, Verify }) => {
  const [documents, setDocuments] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({
    documents: false,
    images: false
  });

  // Update formData whenever documents or images change
  useEffect(() => {
    if (documents.length > 0) {
      setFormData(prev => ({
        ...prev,
        document: documents[0], // Store the first document in formData
        documentsUploaded: true
      }));
    }
    
    if (images.length > 0) {
      setFormData(prev => ({
        ...prev,
        image: images[0], // Store the first image in formData
        imagesUploaded: true
      }));
    }
  }, [documents, images, setFormData]);

  // Function to show document requirements based on sinistre type
  const getRequiredDocuments = () => {
    switch(formData.type_sinistre) {
      case 'automobile':
        return [
          "Carte grise du véhicule",
          "Constat amiable (si accident)",
          "Procès-verbal de police (si applicable)",
          "Devis de réparation"
        ];
      case 'habilitation':
        return [
          "Attestation de propriété ou contrat de bail",
          "Factures des biens endommagés",
          "Devis de réparation",
          "Rapport d'expertise (si disponible)"
        ];
      case 'sante':
        return [
          "Ordonnances médicales",
          "Factures des soins médicaux",
          "Feuilles de soins",
          "Bulletin d'hospitalisation (si applicable)"
        ];
      default:
        return ["Veuillez d'abord sélectionner un type de sinistre"];
    }
  };

  // Function to handle document upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setDocuments([...documents, ...files]);
      setErrors({...errors, documents: false});
    }
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages([...images, ...files]);
      setErrors({...errors, images: false});
    }
  };

  // Function to remove document
  const removeDocument = (index) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
    
    // Update formData if no documents remain
    if (newDocuments.length === 0) {
      setFormData(prev => ({
        ...prev,
        document: null,
        documentsUploaded: false
      }));
    } else {
      // Update with the first remaining document
      setFormData(prev => ({
        ...prev,
        document: newDocuments[0]
      }));
    }
  };

  // Function to remove image
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    // Update formData if no images remain
    if (newImages.length === 0) {
      setFormData(prev => ({
        ...prev,
        image: null,
        imagesUploaded: false
      }));
    } else {
      // Update with the first remaining image
      setFormData(prev => ({
        ...prev,
        image: newImages[0]
      }));
    }
  };

  // Function to show preview for images
  const renderImagePreview = (image, index) => {
    const imageUrl = URL.createObjectURL(image);
    
    return (
      <div key={index} className="relative rounded-md overflow-hidden h-32 bg-gray-100">
        <img 
          src={imageUrl} 
          alt={`Preview ${index}`} 
          className="h-full w-full object-cover"
          onLoad={() => URL.revokeObjectURL(imageUrl)} // Clean up the URL after image loads
        />
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Documents Justificatifs
      </h2>
      
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Documents requis :</h3>
        <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
          {getRequiredDocuments().map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      </div>
      
      {/* Documents Upload Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Documents (PDF, DOC, DOCX)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label htmlFor="document-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Télécharger des documents</span>
                <input 
                  id="document-upload" 
                  name="document-upload" 
                  type="file" 
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={handleDocumentUpload}
                />
              </label>
              <p className="pl-1">ou glisser-déposer</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX jusqu'à 10MB
            </p>
          </div>
        </div>
        {errors.documents && (
          <p className="text-red-500 text-sm">Veuillez télécharger au moins un document</p>
        )}
        
        {/* Display uploaded documents */}
        {documents.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Documents téléchargés:</h4>
            <ul className="divide-y divide-gray-200 border rounded-md">
              {documents.map((doc, index) => (
                <li key={index} className="px-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 flex-1 w-0 truncate">{doc.name}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button 
                      type="button" 
                      onClick={() => removeDocument(index)}
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Images Upload Section */}
      <div className="space-y-2 mt-8">
        <label className="block text-sm font-medium text-gray-700">
          Photos du sinistre (JPG, PNG)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Télécharger des photos</span>
                <input 
                  id="image-upload" 
                  name="image-upload" 
                  type="file" 
                  className="sr-only"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
              <p className="pl-1">ou glisser-déposer</p>
            </div>
            <p className="text-xs text-gray-500">
              JPG, PNG jusqu'à 5MB
            </p>
          </div>
        </div>
        {errors.images && (
          <p className="text-red-500 text-sm">Veuillez télécharger au moins une photo</p>
        )}
        
        {/* Display uploaded images with previews */}
        {images.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Photos téléchargées:</h4>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => renderImagePreview(image, index))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-yellow-50 p-4 rounded-md border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Veuillez vous assurer que les documents et photos téléchargés sont clairs et lisibles. Les fichiers flous, incomplets ou incorrects peuvent retarder le traitement de votre demande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadFiles;