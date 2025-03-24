import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, AlertCircle, CheckCircle, FileText, RefreshCw, Filter } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import ClaimDetailsModal from './ClaimDetailsModal';

const ClaimsDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
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
  
  const fetchClaims = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await fetch(`http://localhost:8081/api/reclamation/getrelamations/${encodedEmail}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch claims: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setClaims(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (email) {
      fetchClaims();
    }
  }, [email]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type) => {
    switch(type) {
      case 'TECHNICAL': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'BILLING': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'SERVICE': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.typeReclamation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || claim.status === filter;
    return matchesSearch && matchesFilter;
  });
  

  
  const displayClaims =  filteredClaims;
  
  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClaim(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">Consulting Claims Dashboard</h1>
          <p className="text-green-600 mt-2">Manage and track all your consulting service claims</p>
          {email && <p className="text-sm text-gray-600 mt-1">Logged in as: {email}</p>}
          
          {/* Added link to Deposer Reclamation page */}
          <a href="deposer" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Déposer une Réclamation
          </a>
        </div>
        
        {/* Auth Status Message */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {submitStatus.message}
          </div>
        )}
        
        {/* Actions Bar */}
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
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-green-100 border border-green-200 text-green-800 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            
            <button 
              onClick={fetchClaims}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              disabled={!email}
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
          <div className="grid grid-cols-1 gap-6">
            {displayClaims.length > 0 ? displayClaims.map(claim => (
              <div key={claim.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getTypeIcon(claim.typeReclamation)}
                      <h2 className="ml-2 text-xl font-semibold text-gray-800">Claim #{claim.id}</h2>
                      <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(claim.status)}`}>
                        {claim.status}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(claim.date)}</span>
                      <Clock className="w-4 h-4 ml-3 mr-1" />
                      <span>{new Date(claim.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{claim.description}</p>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Type: </span>
                        <span className="text-sm font-medium text-green-700">{claim.typeReclamation}</span>
                      </div>
                      <button 
                        onClick={() => handleViewDetails(claim)}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                {claim.message && claim.message.length > 0 && (
                  <div className="bg-green-50 px-6 py-3 border-t border-green-100">
                    <div className="text-sm text-green-800">
                      <span className="font-medium">Latest update: </span>
                      {claim.message[claim.message.length - 1].content}
                    </div>
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <FileText className="h-16 w-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Claims Found</h3>
                <p className="text-gray-500 mb-4">There are no claims matching your search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('ALL');
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Claim Details Modal */}
        {showModal && (
          <ClaimDetailsModal 
            claim={selectedClaim}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
            getTypeIcon={getTypeIcon}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ClaimsDashboard;