import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import ClaimDetailsModal from './ClaimDetailsModal';
import { fetchClaimsByEmail } from './ReclamationFunction.js';
import { formatDate, StatusIndicator } from './ReclamationProp.jsx';
import PaginationComponent from "../../../Components/PaginationComponent";
import {getStatusColor, getModalBg, getTypeIcon } from './ReclamationProp';
import { useNavigate , useLocation } from 'react-router-dom';


const ClaimsDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(10);

  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchData = async (currentFilter = filter) => {
    try {
      setLoading(true);
      let data = await fetchClaimsByEmail(currentFilter === 'ALL' ? null : currentFilter);
      console.log(data);
      setClaims(data);
      setError(null);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    if (location.search.includes('success=true')) {
      setShowSuccess(true);
      
      // Supprimer le paramètre de l'URL
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      // Masquer le message après 5 secondes
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000 * 6);

      return () => clearTimeout(timer);
    }
  }, [location]);

  // Get current claims
  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = claims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPages = Math.ceil(claims.length / claimsPerPage);

  const handleViewDetails = (claim) => {
    console.log(claim);
    setSelectedClaim(claim);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClaim(null);
  };

  const handleRefresh = async () => {
    await fetchData();
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {showSuccess && (
          <div className="mb-8 transition-all duration-500 ease-in-out transform">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Succès!</h3>
                  <div className="mt-1 text-sm text-green-700">
                    <p>Votre réclamation a été enregistrée. Numéro de suivi: #{new Date().getTime().toString().slice(-6)}</p>
                  </div>
                </div>
                <div className="ml-auto pl-3">
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Consulting Claims Dashboard</h1>
          <a 
            href="deposer" 
            className="mt-4 md:mt-0 inline-block bg-[#476f66] hover:bg-[#3a5c54] text-white py-2 px-6 rounded-lg shadow-sm transition-colors"
          >
            Déposer une Réclamation
          </a>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Statut de Réclamation :</h3>
            <div className="w-full md:w-auto">
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="w-full md:w-48 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#476f66]"
              >
                <option value="ALL">Tous</option>
                <option value="PENDING">En cours</option>
                <option value="UNDER_REVIEW">Sous Traitement</option>
                <option value="CANCELLED">Annulé</option>
                <option value="FINISHED">Terminée</option>
              </select>
            </div>

            <div className="relative mt-4 md:mt-0 md:ml-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-3 w-full md:w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#476f66] focus:border-[#476f66]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button 
              onClick={handleRefresh}
              className="mt-4 md:mt-0 flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              <span>Rafraîchir</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-16 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#476f66] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-xl shadow-sm">
            <h3 className="font-medium text-lg">Erreur</h3>
            <p className="mt-2">{error}</p>
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <div className="h-20 w-20 text-gray-300 mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-3">Aucune réclamation trouvée</h3>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="hidden md:grid grid-cols-12 items-center px-6 text-sm font-semibold text-gray-500">
              <div className="col-span-4">Objet</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Statut</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2 text-right pr-6">Action</div>
            </div>

            {currentClaims.map((claim) => (
              <div
                key={claim.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="hidden md:grid grid-cols-12 items-center">
                  {/* Objet */}
                  <div className="col-span-4">
                    <h3 className="font-semibold text-gray-800">{claim.description}</h3>
                  </div>

                  {/* Type */}
                  <div className="col-span-2">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {claim.typeReclamation?.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Statut */}
                  <div className="col-span-2">
                    <StatusIndicator status={claim.status} />
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(claim.date)}</span>
                  </div>

                  {/* Action */}
                  <div className="col-span-2 text-right">
                    <button
                      onClick={(e) => handleViewDetails(claim)}
                      className="bg-[#476f66] hover:bg-[#3a5c54] text-white text-sm px-4 py-2 rounded-lg shadow-sm inline-flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Voir</span>
                    </button>
                  </div>
                </div>

                {/* Mobile view */}
                <div className="md:hidden flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg text-gray-800">{claim.description}</h3>
                    <StatusIndicator status={claim.status} />
                  </div>
                  <div className="text-sm text-gray-500 flex gap-3">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{claim.typeReclamation}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(claim.date)}</span>
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-2">
                    <button
                      onClick={(e) => handleViewDetails (claim)}
                      className="bg-[#476f66] hover:bg-[#3a5c54] text-white text-sm px-4 py-2 rounded-lg shadow-sm inline-flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Voir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <PaginationComponent
              totalPages={totalPages}
              pageCourante={currentPage}
              setPageCourante={setCurrentPage}
              setExpandedId={() => null}
              sinistres={claims}
              premierIndex={indexOfFirstClaim}
              dernierIndex={indexOfLastClaim}
            />
          </div>
        )}

        {/* Claim Details Modal */}
        {showModal && selectedClaim && (
          <ClaimDetailsModal 
            claim={selectedClaim}
            formatDate={formatDate}
            onClose={handleCloseModal}
            getStatusColor = {getStatusColor}
            getModalBg = {getModalBg}
            getTypeIcon = {getTypeIcon}
          />
        )}
      </div>
    </div>
  );
};

export default ClaimsDashboard;