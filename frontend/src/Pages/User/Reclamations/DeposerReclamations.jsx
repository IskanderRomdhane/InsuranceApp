import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { submitReclamation } from './ReclamationFunction.js';
import DeposerReclamationInfo from '../../../Components/DeposerReclamationInfo.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Hooks/TokenInterceptor';

const DeposerReclamations = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    userEmail: "",
    typeReclamation: "",
    description: "",
    file: null,
    sinistreId: "" // New field for selected sinistre
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [rejectedSinistres, setRejectedSinistres] = useState([]);
  const [showSinistreSelector, setShowSinistreSelector] = useState(false);
  const [isLoadingSinistres, setIsLoadingSinistres] = useState(false);
  const navigate = useNavigate();

  // Fetch email from JWT token on component mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token");
      const storedUserId = localStorage.getItem("userId");
      
      if (token && storedUserId) {
        try {
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
          setUserId(storedUserId);
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

  // Fetch sinistres when needed
  useEffect(() => {
    if (showSinistreSelector && userId && formData.typeReclamation) {
      fetchSinistres(userId);
    }
  }, [showSinistreSelector, userId, formData.typeReclamation]);

  // Function to fetch sinistres based on reclamation type
  const fetchSinistres = async (userId) => {
    setIsLoadingSinistres(true);
    try {
      // Choose the correct endpoint based on the reclamation type
      let endpoint;
      if (formData.typeReclamation === "DOCUMENTS_MANQUANTS") {
        endpoint = `/api/sinistre/getuserdocumentmanquantssinistres/${userId}`;
      } else {
        endpoint = `/api/sinistre/getuserrejectedsinistres/${userId}`;
      }
      
      console.log("Fetching sinistres from endpoint:", endpoint);
      const response = await axiosInstance.get(endpoint);
      setRejectedSinistres(response.data);
    } catch (error) {
      console.error('Error fetching sinistres:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erreur lors de la récupération des sinistres.'
      });
    } finally {
      setIsLoadingSinistres(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "typeReclamation") {
      // Check if the selected type requires sinistre selection
      const requiresSinistre = ["REJET_CONTESTE", "DEMANDE_REEVALUATION", "DOCUMENTS_MANQUANTS"].includes(value);
      setShowSinistreSelector(requiresSinistre);
      
      // Reset sinistre selection and fetch appropriate sinistres if needed
      setFormData(prevState => ({
        ...prevState,
        sinistreId: "", // Always reset when changing type
        [name]: value
      }));
      
      // The useEffect will handle fetching if requiresSinistre is true
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Type de fichier non autorisé. Seuls les images (JPEG, PNG, GIF) et PDF sont acceptés.'
        });
        e.target.value = null;
        return;
      }

      if (file.size > maxSize) {
        setSubmitStatus({
          type: 'error',
          message: 'La taille du fichier ne doit pas dépasser 5 Mo.'
        });
        e.target.value = null;
        return;
      }

      setFormData(prevState => ({
        ...prevState,
        file: file
      }));

      // Create file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitReclamation(formData, email);
      
      // Redirection vers la page de consultation avec un paramètre de succès
      navigate('/reclamations/consulter?success=true');

      // Reset form (optionnel car nous redirigeons)
      setFormData({
        userEmail: email,
        typeReclamation: "",
        description: "",
        file: null,
        sinistreId: ""
      });
      setFilePreview(null);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 
               'Erreur lors de la soumission. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if file is required (only for DOCUMENTS_MANQUANTS type)
  const isFileRequired = formData.typeReclamation === "DOCUMENTS_MANQUANTS";

  return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
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
                  <h2 className="text-2xl font-bold text-black mb-6 pb-3">
                    Détails de votre réclamation
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Type of Complaint input with updated options */}
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
                          <option value="RETARD_SERVICE">Retard de Service</option>
                          <option value="ACCES_COMPTE">Accès au Compte</option>
                          <option value="PROBLEME_NON_RESOLU">Problème Non Résolu</option>
                          <option value="SUPPORT_INADEQUAT">Support Inadéquat</option>
                          <option value="REJET_CONTESTE">Contestation de Rejet</option>
                          <option value="DEMANDE_REEVALUATION">Demande de Réévaluation</option>
                          <option value="DOCUMENTS_MANQUANTS">Documents Manquants</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-green-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Sinistre selector - only shown for specific reclamation types */}
                    {showSinistreSelector && (
                      <div>
                        <label className="block text-lg font-medium mb-3 text-gray-700">
                          {formData.typeReclamation === "DOCUMENTS_MANQUANTS" 
                            ? "Sinistre Nécessitant des Documents" 
                            : "Sinistre Concerné"}
                        </label>
                        <div className="relative">
                          {isLoadingSinistres ? (
                            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                              <svg className="animate-spin h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span className="ml-2 text-gray-600">Chargement des sinistres...</span>
                            </div>
                          ) : rejectedSinistres.length > 0 ? (
                            <select
                              name="sinistreId"
                              value={formData.sinistreId}
                              onChange={handleChange}
                              className="w-full p-4 pr-10 bg-gray-50 border-none rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 appearance-none text-gray-700"
                              required
                            >
                              <option value="">Sélectionnez un sinistre</option>
                              {rejectedSinistres.map((sinistre) => (
                                <option key={sinistre.id} value={sinistre.id}>
                                  Sinistre #{sinistre.id} - {sinistre.objectSinistre} - {sinistre.categorie} - {sinistre.amount} €
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800">
                              <p>
                                {formData.typeReclamation === "DOCUMENTS_MANQUANTS"
                                  ? "Aucun sinistre nécessitant des documents trouvé."
                                  : "Aucun sinistre rejeté trouvé."} 
                                Si vous pensez qu'il s'agit d'une erreur, veuillez contacter le support.
                              </p>
                            </div>
                          )}
                          {rejectedSinistres.length > 0 && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-green-500">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description input */}
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

                    {/* File Upload Section - required for DOCUMENTS_MANQUANTS */}
                    <div>
                      <label className="block text-lg font-medium text-gray-700">
                        Pièce Jointe {isFileRequired ? "(Obligatoire)" : "(Optionnel)"}
                      </label>
                      <div className="relative">
                        <input
                            type="file"
                            name="fileInput"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.gif,.pdf"
                            className="w-full p-4 bg-gray-50 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 border-none file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-gray-700 hover:file:bg-gray-50"
                            required={isFileRequired}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Formats acceptés: JPG, PNG, GIF, PDF (max 5 Mo)
                        </p>
                      </div>

                      {/* File Preview */}
                      {filePreview && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Aperçu du fichier:</p>
                            {formData.file.type.startsWith('image/') ? (
                                <img
                                    src={filePreview}
                                    alt="Aperçu du fichier"
                                    className="max-w-xs max-h-40 rounded-lg shadow-md object-cover"
                                />
                            ) : (
                                <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                                  <svg className="w-8 h-8 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-600">{formData.file.name}</span>
                                </div>
                            )}
                          </div>
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="pt-4">
                      <button
                          type="submit"
                          disabled={isSubmitting || !email || (showSinistreSelector && !formData.sinistreId) || (isFileRequired && !formData.file)}
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

                  {/* Status message */}
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

            <DeposerReclamationInfo />
          </div>
        </div>
      </div>
  );
};

export default DeposerReclamations;