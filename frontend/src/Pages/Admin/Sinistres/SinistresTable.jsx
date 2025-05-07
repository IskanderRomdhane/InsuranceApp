import { useState, useEffect } from 'react';
import { Search, Calendar, FileText, ArrowRight, ChevronDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function SinistresTable() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(10);
  const navigate = useNavigate();
  const filterOptions = ['Tous', 'Sante', 'AutoMobile', 'Habilitation'];
  
  const viewDetails = (e, id) => {
    e.stopPropagation();
    navigate(`/admin/sinistre/details/${id}`);
  }
  
  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const url = activeFilter === 'Tous' 
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

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedClaim(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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
        <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };

  const PaginationComponent = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-center border-t border-gray-200 px-6 py-4 sm:px-8">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
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
    );
  };

  const cardLayoutStyles = {
    actionColumn: "w-full md:w-auto flex items-center justify-between",
    statusColumnWidth: "w-32",
    amountColumnWidth: "w-36"
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Users Sinistres</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-between w-full md:w-48 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#476f66]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>{activeFilter}</span>
                  <ChevronDown className="ml-2 h-5 w-5" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-[#476f66] focus:border-[#476f66] block w-full text-sm"
                placeholder="Rechercher Reclamation ..."
              />
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-16 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#476f66] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-xl shadow-sm">
            <h3 className="font-medium text-lg">Error loading claims</h3>
            <p className="mt-2">{error}</p>
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <FileText className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-700 mb-3">No Claims Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">There are no claims matching your selected filter. Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentClaims.map((claim) => (
              <div 
                key={claim.id} 
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedClaim(claim)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-6 flex-1">
                    <div className={`w-3 h-16 rounded-full ${claim.etat === 'ACCEPTED' ? 'bg-green-500' : claim.etat === 'PENDING' ? 'bg-yellow-500' : claim.etat === 'REJECTED' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{claim.objectSinistre}</h3>
                      <div className="flex items-center mt-2 text-gray-500 text-sm space-x-3">
                        <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">{claim.sinistre_type || claim.categorie}</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          <span className="font-medium">{formatDate(claim.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    <div className="w-36 flex justify-center">
                      <button 
                        className="transition-all duration-300 bg-[#476f66] hover:bg-[#3a5c54] text-white px-6 py-3 rounded-lg shadow-sm flex items-center gap-2 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#476f66] focus:ring-opacity-50"
                        onClick={(e) => viewDetails(e, claim.id)}
                      >
                        <Eye className="h-5 w-5" />
                        <span className="font-medium">Consulter</span>
                      </button>
                    </div>
                    
                    <div className={cardLayoutStyles.statusColumnWidth + " flex items-center justify-center"}>
                      <StatusIndicator status={claim.etat} />
                    </div>
                    
                    <div className={cardLayoutStyles.amountColumnWidth + " text-xl font-bold text-[#476f66] text-right"}>
                      {claim.amount?.toFixed(2) || '000'} TND
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <PaginationComponent />
          </div>
        )}
      </div>
    </div>
  );
}