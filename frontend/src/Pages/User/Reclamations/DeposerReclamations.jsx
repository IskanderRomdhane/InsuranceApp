import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const DeposerReclamations = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    userEmail: "",
    typeReclamation: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch email from JWT token on component mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
          setFormData(prevState => ({
            ...prevState,
            userEmail: decoded.email
          }));
        } catch (error) {
          console.error('Error parsing auth token:', error);
          setSubmitStatus({ 
            type: 'error', 
            message: 'Erreur d\'authentification. Veuillez vous reconnecter.' 
          });
        }
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Vous devez être connecté pour soumettre une réclamation.' 
        });
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Ensure the email is set in the form data
      const submissionData = {
        ...formData,
        userEmail: email // Use the email fetched from JWT
      };
      
      const response = await fetch('http://localhost:8081/api/reclamation/CreerReclamation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Check the content type to determine how to handle the response
      const contentType = response.headers.get("content-type");
      let responseData;
      
      if (contentType && contentType.includes("application/json")) {
        // If response is JSON, parse it
        responseData = await response.json();
        console.log('Success (JSON):', responseData);
      } else {
        // If response is text (or other format), get as text
        responseData = await response.text();
        console.log('Success (Text):', responseData);
      }
      
      setSubmitStatus({ type: 'success', message: 'Réclamation soumise avec succès!' });
      setFormData(prevState => ({
        ...prevState,
        typeReclamation: "",
        description: ""
      }));
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Erreur lors de la soumission. Veuillez réessayer.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">Déposer une Réclamation</h1>
          <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre écoute pour résoudre vos problèmes rapidement et efficacement
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left side - Form with elegant styling */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-8 pt-8 pb-10">
                <h2 className="text-2xl font-bold text-green-700 mb-6 border-b border-green-100 pb-3">
                  Détails de votre réclamation
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Adresse Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        className="w-full p-4 bg-gray-50 border-none rounded-lg shadow-sm text-gray-700"
                        placeholder="Votre adresse email sera automatiquement récupérée"
                        disabled
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Email récupéré de votre compte</p>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Type de Réclamation</label>
                    <div className="relative">
                      <select 
                        name="typeReclamation"
                        value={formData.typeReclamation}
                        onChange={handleChange}
                        className="w-full p-4 pr-10 bg-gray-50 border-none rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 appearance-none text-gray-700"
                        required
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="SERVICE_DELAY">Retard de Service</option>
                        <option value="ACCOUNT_ACCESS">Accès au Compte</option>
                        <option value="UNRESOLVED_ISSUE">Problème Non Résolu</option>
                        <option value="POOR_SUPPORT">Support Insuffisant</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Description</label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        className="w-full p-4 bg-gray-50 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 border-none resize-none text-gray-700"
                        placeholder="Veuillez décrire votre réclamation en détail..."
                        required
                      />
                      <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                        {formData.description.length} caractères
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 text-lg font-medium shadow-md"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Soumission en cours...
                        </span>
                      ) : 'Soumettre la Réclamation'}
                    </button>
                  </div>
                </form>
                
                {submitStatus && (
                  <div className={`mt-6 p-5 rounded-lg flex items-start ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
                    <div className="flex-shrink-0 mt-0.5">
                      {submitStatus.type === 'success' ? (
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{submitStatus.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right side - Staff support info with nature-inspired green theme */}
          <div className="w-full lg:w-2/5 lg:ml-auto">
            <div className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-green-900 opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-center px-6 drop-shadow-md">Protection & Sérénité</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Notre engagement</h3>
                  <p className="text-green-100 mb-4">
                    Nous vous offrons une assurance qui s'adapte à vos besoins avec un traitement rapide de vos réclamations. Votre tranquillité d'esprit est notre priorité.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-800 bg-opacity-30 rounded-lg">
                    <div className="bg-green-600 p-3 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Réponse sous 24 heures</h4>
                      <p className="text-green-200 text-sm">Nous valorisons votre temps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-800 bg-opacity-30 rounded-lg">
                    <div className="bg-green-600 p-3 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Suivi personnalisé</h4>
                      <p className="text-green-200 text-sm">Un conseiller dédié à votre dossier</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-800 bg-opacity-30 rounded-lg">
                    <div className="bg-green-600 p-3 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Protection complète</h4>
                      <p className="text-green-200 text-sm">Des solutions adaptées à chaque situation</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Assistance immédiate</p>
                      <p className="text-green-200 text-sm">Disponible 24/7 pour vous</p>
                    </div>
                    <button className="bg-white text-green-700 py-2 px-6 rounded-full font-medium hover:bg-green-50 transition duration-300 shadow-lg">
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeposerReclamations;