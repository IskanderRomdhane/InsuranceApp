import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Confirmation = ({ formData, setFormData, Verify }) => {
  const navigate = useNavigate();
  
  
  // Get claim type in French
  const getClaimTypeInFrench = () => {
    switch(formData.type_sinistre) {
      case 'Automobile': return 'Automobile';
      case 'Habitation': return 'Habitation';
      case 'Sante': return 'Santé';
      default: return 'N/A';
    }
  };
  
  const handleBackToHome = () => {
    navigate('/dashboard');
  };
  
  const handleViewClaim = () => {
    navigate(`/sinistres/${formData.claimReference}`);
  };

  useEffect(() => {
    console.log(formData);
    if (!formData.claimReference) {
      setFormData({
        ...formData,
        claimReference: "",
        submissionDate: new Date().toISOString(),
        status: 'En attente'
      });
    }
  }, []);

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Déclaration envoyée avec succès!
      </h2>
      
      <div className="text-center max-w-md">
        <p className="text-gray-600 mb-4">
          Votre déclaration de sinistre a été enregistrée et sera traitée dans les plus brefs délais. Un conseiller prendra contact avec vous pour la suite.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left mb-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Référence du sinistre:</span>
              <p className="font-medium text-blue-600">{formData.claimReference}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Type de sinistre:</span>
              <p>{formData.type_sinistre}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Date de soumission:</span>
              <p>{new Date(formData.submissionDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Statut:</span>
              <p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {formData.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6 text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Conservez précieusement cette référence pour le suivi de votre dossier. Un email récapitulatif vous a également été envoyé.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-100 transition duration-200"
          >
            Retour à l'accueil
          </button>
          
          <button
            onClick={handleViewClaim}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-200"
          >
            Voir mon sinistre
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation