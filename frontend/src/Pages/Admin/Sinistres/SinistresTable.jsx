import { useState, useEffect } from 'react';
import { Search, Calendar, FileText, ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClaimsModal from './ClaimsModal';

export default function SinistresTable() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(10);
  const navigate = useNavigate();
  const filterOptions = ['All', 'Sante', 'AutoMobile', 'Habilitation'];
  
  const viewDetails = (id) => {
    navigate(`/admin/sinistre/details/${id}`);
  }
  
  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const url = activeFilter === 'All' 
          ? 'http://localhost:8081/api/sinistre/sinistres'
          : `http://localhost:8081/api/sinistre/getsinistre/type/${activeFilter}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch claims');
        setClaims(await response.json());
        setCurrentPage(1);
        setError(null);
      } catch (err) {
        setError(err.message);
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClaims();
  }, [activeFilter]);

  const handleFilterSelect = (option) => {
    setActiveFilter(option);
    setDropdownOpen(false);
  };

  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = claims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPages = Math.ceil(claims.length / claimsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setSelectedClaim(null);
    }
  };

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    const statusConfig = {
      "ACCEPTED": {
        color: "bg-green-500",
        label: "Accepted"
      },
      "PENDING": {
        color: "bg-yellow-500",
        label: "Pending"
      },
      "REJECTED": {
        color: "bg-red-500",
        label: "Rejected"
      },
      "UNDER_REVIEW": {
        color: "bg-blue-500",
        label: "Under Review"
      }
    };
    
    const config = statusConfig[status] || { color: "bg-gray-500", label: status?.replace("_", " ") || "Unknown" };
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${config.color} mr-2`}></div>
        <span className="text-sm">{config.label}</span>
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                      currentPage === pageNum
                        ? 'z-10 border-[#476f66] bg-[#476f66] text-white'
                        : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Users Sinistres</h1>
        </div>
        
        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Dropdown Filter */}
            <div className="relative mb-4 md:mb-0">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-between w-full md:w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#476f66]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>{activeFilter}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {filterOptions.map((option) => (
                        <button
                          key={option}
                          className={`block w-full px-4 py-2 text-sm text-left ${
                            activeFilter === option
                              ? 'bg-[#476f66] text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => handleFilterSelect(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-[#476f66] focus:border-[#476f66] block w-full sm:text-sm"
                placeholder="Search claims..."
              />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#476f66] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm">
            <h3 className="font-medium">Error loading claims</h3>
            <p className="mt-1">{error}</p>
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Claims Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">There are no claims matching your selected filter. Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Claims cards */}
            <div className="grid grid-cols-1 divide-y divide-gray-200">
              {currentClaims.map((claim) => (
                <div key={claim.id} className="p-6 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedClaim(claim)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className={`w-2 h-12 rounded-full ${claim.etat === 'ACCEPTED' ? 'bg-green-500' : claim.etat === 'PENDING' ? 'bg-yellow-500' : claim.etat === 'REJECTED' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <h3 className="font-medium text-gray-800">{claim.objectSinistre}</h3>
                        <div className="flex items-center mt-1 text-gray-500 text-sm">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full">{claim.sinistre_type || claim.categorie}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(claim.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                      <div className="flex items-center mr-8">
                        <StatusIndicator status={claim.etat} />
                      </div>
                      <div className="text-lg font-bold text-[#476f66]">{claim.amount?.toFixed(2) || '0.00'} TND</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination />
          </div>
        )}
      </div>
      
      {/* Modal for claim details */} 
      {selectedClaim && (
        <ClaimsModal 
          claim={selectedClaim}
          formatDate={formatDate}
          StatusIndicator={StatusIndicator}
          viewDetails={viewDetails}
          onClose={() => setSelectedClaim(null)}
        />
      )}
    </div>
  );
}