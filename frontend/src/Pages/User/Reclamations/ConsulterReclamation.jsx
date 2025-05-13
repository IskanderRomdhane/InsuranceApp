import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import ClaimDetailsModal from './ClaimDetailsModal';
import { fetchClaimsByEmail } from './ReclamationFunction.js';
import { formatDate, getStatusColor, getModalBg, getTypeIcon } from './ReclamationProp';
import ReclamationFields from '../../../Components/ReclamationTablePage/ReclamationFields.jsx';

const ClaimsDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (currentFilter = filter, search = searchTerm) => {
    try {
      setLoading(true);
      let data = await fetchClaimsByEmail(currentFilter === 'ALL' ? null : currentFilter);      
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

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClaim(null);
  };

  const handleRefresh = async () => {
    await fetchData();
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-grey">Consulting Claims Dashboard</h1>
          <a href="deposer" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Déposer une Réclamation
          </a>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-green-500" />
            </div>
            <input
              type="text"
              placeholder="Search claims..."
              className="pl-10 pr-4 py-2 w-full border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative inline-block">
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="appearance-none bg-white border border-green-200 text-green-800 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">En cours</option>
                <option value="UNDER_REVIEW">Sous Traitement</option>
                <option value="CANCELLED ">Annulé</option>
                <option value="FINISHED">Terminée</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            
            <button 
              onClick={handleRefresh}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Claims List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <ReclamationFields 
            displayClaims={claims}
            setSearchTerm={setSearchTerm}
            setFilter={handleFilterChange}
            handleViewDetails={handleViewDetails}
          />
        )}
        
        {/* Claim Details Modal */}
        {showModal && (
          <ClaimDetailsModal 
            claim={selectedClaim}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
            getTypeIcon={getTypeIcon}
            onClose={handleCloseModal}
            getModalBg={getModalBg}
          />
        )}
      </div>
    </div>
  );
};

export default ClaimsDashboard;