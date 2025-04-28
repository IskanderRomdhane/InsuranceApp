import React, { useState, useEffect } from 'react';
import { Search, Calendar, FileText, RefreshCw, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReclamationsTable = () => {
  const [reclamations, setReclamations] = useState([]);
  const [reclamationsFiltrees, setReclamationsFiltrees] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [termeRecherche, setTermeRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('ALL');
  const [filtreType, setFiltreType] = useState('ALL');
  const [erreur, setErreur] = useState('');
  const [pageCourante, setPageCourante] = useState(1);
  const [reclamationsParPage] = useState(10);
  
  const navigate = useNavigate();
  
  const optionsStatut = [
    { value: 'ALL', label: 'Tous les statuts' },
    { value: 'PENDING', label: 'En attente' },
    { value: 'UNDER_REVIEW', label: 'En cours d\'examen' },
    { value: 'CANCELLED', label: 'Annulée' },
    { value: 'FINISHED', label: 'Terminée' }
  ];
  
  const optionsType = [
    { value: 'ALL', label: 'Tous les types' },
    { value: 'SERVICE_DELAY', label: 'Retard de service' },
    { value: 'ACCOUNT_ACCESS', label: 'Accès au compte' },
    { value: 'UNRESOLVED_ISSUE', label: 'Problème non résolu' },
    { value: 'POOR_SUPPORT', label: 'Support insuffisant' }
  ];

  const configStatut = {
    "PENDING": { color: "bg-yellow-500", label: "En attente" },
    "UNDER_REVIEW": { color: "bg-blue-500", label: "En cours d'examen" },
    "CANCELLED": { color: "bg-red-500", label: "Annulée" },
    "FINISHED": { color: "bg-green-500", label: "Terminée" }
  };

  const chargerReclamations = async () => {
    setChargement(true);
    try {
      const reponse = await axios.get('http://localhost:8081/api/reclamation/getusersrelamations');
      if (reponse.status !== 200) throw new Error('Échec du chargement des réclamations');
      const donnees = reponse.data;
      setReclamations(donnees);
      setReclamationsFiltrees(donnees);
      setFiltreStatut('ALL');
      setFiltreType('ALL');
      setPageCourante(1);
    } catch (erreur) {
      console.log(erreur);
      setErreur('Échec du chargement des réclamations. Veuillez réessayer plus tard.');
    } finally {
      setChargement(false);
    }
  };

  // Charger les données initiales
  useEffect(() => {
    chargerReclamations();
  }, []);

  // Filtrer les reclamations basé sur le terme de recherche
  useEffect(() => {
    if (termeRecherche) {
      const resultatRecherche = reclamations.filter(reclamation => 
        reclamation.description?.toLowerCase().includes(termeRecherche.toLowerCase()) || 
        reclamation.fullName?.toLowerCase().includes(termeRecherche.toLowerCase()) ||
        reclamation.id?.toString().includes(termeRecherche)
      );
      setReclamationsFiltrees(resultatRecherche);
    } else if (filtreStatut === 'ALL' && filtreType === 'ALL') {
      setReclamationsFiltrees(reclamations);
    }
  }, [termeRecherche, reclamations]);

  // Fonction pour charger les réclamations filtrées par statut
  const filtrerParStatut = async (statut) => {
    if (statut === 'ALL') {
      if (filtreType === 'ALL') {
        chargerReclamations();
      } else {
        filtrerParType(filtreType);
      }
      return;
    }
    
    setChargement(true);
    try {
      const reponse = await axios.get(`http://localhost:8081/api/reclamation/getreclamation/status/${statut}`);
      let donnees = reponse.data;
      
      // Si un filtre de type est également actif, filtrer davantage côté client
      if (filtreType !== 'ALL') {
        donnees = donnees.filter(reclamation => reclamation.type === filtreType);
      }
      
      // Appliquer également le filtre de recherche si présent
      if (termeRecherche) {
        donnees = donnees.filter(reclamation => 
          reclamation.description?.toLowerCase().includes(termeRecherche.toLowerCase()) || 
          reclamation.fullName?.toLowerCase().includes(termeRecherche.toLowerCase()) ||
          reclamation.id?.toString().includes(termeRecherche)
        );
      }
      
      setReclamationsFiltrees(donnees);
      setPageCourante(1);
    } catch (erreur) {
      console.error(erreur);
      setErreur('Échec du filtrage par statut. Veuillez réessayer.');
    } finally {
      setChargement(false);
    }
  };

  // Fonction pour charger les réclamations filtrées par type
  const filtrerParType = async (type) => {
    if (type === 'ALL') {
      if (filtreStatut === 'ALL') {
        chargerReclamations();
      } else {
        filtrerParStatut(filtreStatut);
      }
      return;
    }
    
    setChargement(true);
    try {
      const reponse = await axios.get(`http://localhost:8081/api/reclamation/getreclamation/type/${type}`);
      let donnees = reponse.data;
      
      // Si un filtre de statut est également actif, filtrer davantage côté client
      if (filtreStatut !== 'ALL') {
        donnees = donnees.filter(reclamation => reclamation.status === filtreStatut);
      }
      
      // Appliquer également le filtre de recherche si présent
      if (termeRecherche) {
        donnees = donnees.filter(reclamation => 
          reclamation.description?.toLowerCase().includes(termeRecherche.toLowerCase()) || 
          reclamation.fullName?.toLowerCase().includes(termeRecherche.toLowerCase()) ||
          reclamation.id?.toString().includes(termeRecherche)
        );
      }
      
      setReclamationsFiltrees(donnees);
      setPageCourante(1);
    } catch (erreur) {
      console.error(erreur);
      setErreur('Échec du filtrage par type. Veuillez réessayer.');
    } finally {
      setChargement(false);
    }
  };

  // Gestionnaire de changement de filtre statut
  const gererChangementStatut = (nouveauStatut) => {
    setFiltreStatut(nouveauStatut);
    filtrerParStatut(nouveauStatut);
  };

  // Gestionnaire de changement de filtre type
  const gererChangementType = (nouveauType) => {
    setFiltreType(nouveauType);
    filtrerParType(nouveauType);
  };

  const formaterDate = (chaineDate) => {
    if (!chaineDate) return 'N/A';
    const date = new Date(chaineDate);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  // Calcul de la pagination
  const indexDernierElement = pageCourante * reclamationsParPage;
  const indexPremierElement = indexDernierElement - reclamationsParPage;
  const reclamationsCourantes = reclamationsFiltrees.slice(indexPremierElement, indexDernierElement);
  const nombrePages = Math.ceil(reclamationsFiltrees.length / reclamationsParPage);

  const allerALaPage = (numeroDePage) => {
    if (numeroDePage > 0 && numeroDePage <= nombrePages) {
      setPageCourante(numeroDePage);
    }
  };

  const IndicateurStatut = ({ status }) => {
    const config = configStatut[status] || { color: "bg-gray-500", label: status?.replace("_", " ") || "Inconnu" };
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${config.color} mr-2`}></div>
        <span className="text-sm">{config.label}</span>
      </div>
    );
  };

  const SelectFiltre = ({ options, valeur, onChange, icone }) => (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <span className="p-2 bg-gray-50">
          {icone}
        </span>
        <select
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          className="py-2 pl-2 pr-8 appearance-none bg-transparent border-0 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Réclamations</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-700 focus:border-green-700 block w-full sm:text-sm"
                placeholder="Rechercher des réclamations..."
                value={termeRecherche}
                onChange={(e) => setTermeRecherche(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SelectFiltre 
                options={optionsStatut} 
                valeur={filtreStatut} 
                onChange={gererChangementStatut}
                icone={<Filter className="w-4 h-4 text-gray-500" />}
              />
              
              <SelectFiltre 
                options={optionsType} 
                valeur={filtreType} 
                onChange={gererChangementType}
                icone={<Filter className="w-4 h-4 text-gray-500" />}
              />
              
              <button 
                className="flex items-center justify-center bg-white text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                onClick={chargerReclamations}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </button>
            </div>
          </div>
        </div>
        
        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
            <p>{erreur}</p>
          </div>
        )}
        
        {chargement ? (
          <div className="bg-white rounded-lg shadow-sm p-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
          </div>
        ) : reclamationsFiltrees.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune réclamation trouvée</h3>
            <p className="text-gray-500 max-w-md mx-auto">Aucune réclamation ne correspond à vos filtres. Essayez d'autres filtres ou revenez plus tard.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-gray-200">
              {reclamationsCourantes.map((reclamation) => (
                <div 
                  key={reclamation.id} 
                  className="p-6 hover:bg-gray-50 cursor-pointer" 
                  onClick={() => navigate(`/admin/reclamation/${reclamation.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className={`w-2 h-12 rounded-full ${configStatut[reclamation.status]?.color || 'bg-gray-500'}`}></div>
                      <div>
                        <h3 className="font-medium text-gray-800">{reclamation.id} <span className='font-normal'> {reclamation.fullName || 'Utilisateur inconnu'}</span></h3>
                        <div className="flex items-center mt-1 text-gray-500 text-sm">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                            {reclamation.type?.replace(/_/g, ' ') || 'Type inconnu'}
                          </span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formaterDate(reclamation.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                      <div className="flex items-center mr-8">
                        <IndicateurStatut status={reclamation.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {nombrePages > 1 && (
              <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => allerALaPage(pageCourante - 1)}
                    disabled={pageCourante === 1}
                    className={`relative inline-flex items-center rounded-l-md border px-2 py-2 ${
                      pageCourante === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, nombrePages) }, (_, i) => {
                    let numeroDePage;
                    if (nombrePages <= 5) {
                      numeroDePage = i + 1;
                    } else if (pageCourante <= 3) {
                      numeroDePage = i + 1;
                    } else if (pageCourante >= nombrePages - 2) {
                      numeroDePage = nombrePages - 4 + i;
                    } else {
                      numeroDePage = pageCourante - 2 + i;
                    }
                    
                    return (
                      <button
                        key={numeroDePage}
                        onClick={() => allerALaPage(numeroDePage)}
                        className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                          pageCourante === numeroDePage
                            ? 'z-10 border-green-700 bg-green-700 text-white'
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {numeroDePage}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => allerALaPage(pageCourante + 1)}
                    disabled={pageCourante === nombrePages}
                    className={`relative inline-flex items-center rounded-r-md border px-2 py-2 ${
                      pageCourante === nombrePages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReclamationsTable;