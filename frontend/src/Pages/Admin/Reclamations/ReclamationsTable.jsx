import React, { useState, useEffect } from 'react';
import { Search, Calendar, FileText, RefreshCw, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500 text-white border-yellow-200';
      case 'UNDER_REVIEW': return 'bg-blue-500 text-white border-blue-200';
      case 'CANCELLED': return 'bg-red-500 text-white border-red-200';
      case 'FINISHED': return 'bg-green-500 text-white border-green-200';
      default: return 'bg-gray-100 text-white border-gray-200';
    }
  };

  const getStatusInFrench = (status) => {
    switch (status) {
      case 'PENDING': return 'EN ATTENTE';
      case 'UNDER_REVIEW': return 'EN COURS D\'EXAMEN';
      case 'CANCELLED': return 'ANNULÉE';
      case 'FINISHED': return 'TERMINÉE';
      default: return status;
    }
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

  useEffect(() => {
    chargerReclamations();
  }, []);

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
      
      if (filtreType !== 'ALL') {
        donnees = donnees.filter(reclamation => reclamation.type === filtreType);
      }
      
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
      
      if (filtreStatut !== 'ALL') {
        donnees = donnees.filter(reclamation => reclamation.status === filtreStatut);
      }
      
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

  const gererChangementStatut = (nouveauStatut) => {
    setFiltreStatut(nouveauStatut);
    filtrerParStatut(nouveauStatut);
  };

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

  const indexDernierElement = pageCourante * reclamationsParPage;
  const indexPremierElement = indexDernierElement - reclamationsParPage;
  const reclamationsCourantes = reclamationsFiltrees.slice(indexPremierElement, indexDernierElement);
  const nombrePages = Math.ceil(reclamationsFiltrees.length / reclamationsParPage);

  const handlePageChange = (event, pageNumber) => {
    setPageCourante(pageNumber);
  };

  const SelectFiltre = ({ options, valeur, onChange, icone }) => (
    <div className="relative w-full md:w-56">
      <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <span className="p-3 bg-gray-50 border-r border-gray-200">
          {icone}
        </span>
        <select
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          className="py-3 pl-3 pr-8 appearance-none bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Réclamations</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full text-sm shadow-sm"
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
                icone={<Filter className="w-5 h-5 text-gray-600" />}
              />
              
              <SelectFiltre 
                options={optionsType} 
                valeur={filtreType} 
                onChange={gererChangementType}
                icone={<Filter className="w-5 h-5 text-gray-600" />}
              />
              
              <button 
                className="flex items-center justify-center bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                onClick={chargerReclamations}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Actualiser
              </button>
            </div>
          </div>
        </div>
        
        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm mb-6">
            <p className="font-semibold text-lg">Erreur</p>
            <p className="text-sm mt-1">{erreur}</p>
          </div>
        )}
        
        {chargement ? (
          <div className="bg-white rounded-xl shadow-sm p-12 flex justify-center border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : reclamationsFiltrees.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune réclamation trouvée</h3>
            <p className="text-gray-600 max-w-md mx-auto">Aucune réclamation ne correspond à vos filtres. Essayez d'autres filtres ou revenez plus tard.</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden">
            <div className="grid gap-6 p-6">
              {reclamationsCourantes.map((reclamation) => (
                <div 
                  key={reclamation.id} 
                  className="p-6 bg-white hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200 rounded-2xl shadow-sm hover:shadow-md" 
                  onClick={() => navigate(`/admin/reclamation/${reclamation.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-16 rounded-full ${getStatusBadgeColor(reclamation.status).split(' ')[0].replace('bg-', 'bg-')}`}></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Réclamation #{reclamation.id} <span className="font-normal text-sm text-gray-700">{reclamation.fullName || 'Utilisateur inconnu'}</span>
                        </h3>
                        <div className="flex flex-wrap items-center mt-2 text-gray-600 text-sm space-x-4">
                          <span className="bg-gray-100 px-3 py-1.5 rounded-full">
                            {reclamation.type?.replace(/_/g, ' ') || 'Type inconnu'}
                          </span>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formaterDate(reclamation.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
                      <span className={`px-4 py-2 rounded-full font-semibold border ${getStatusBadgeColor(reclamation.status)}`}>
                        {getStatusInFrench(reclamation.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {nombrePages > 1 && (
              <div className="flex items-center justify-center border-t border-gray-200 px-4 py-6">
                <Stack spacing={2}>
                  <Pagination
                    count={nombrePages}
                    page={pageCourante}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#476f66',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: '#f1f5f5',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#476f66',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#3a5c54',
                          },
                        },
                      },
                    }}
                  />
                </Stack>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReclamationsTable;