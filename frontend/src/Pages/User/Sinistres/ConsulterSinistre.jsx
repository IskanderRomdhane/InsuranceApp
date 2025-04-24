import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClaimsPage() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(10);
  
  const filterOptions = ['All', 'Sante', 'AutoMobile', 'Habilitation'];

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
        setCurrentPage(1); // Reset to first page when filter changes
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

  // Get current claims
  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = claims.slice(indexOfFirstClaim, indexOfLastClaim);
  const totalPages = Math.ceil(claims.length / claimsPerPage);

  // Change page
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Close any expanded item when changing pages
      setExpandedId(null);
    }
  };

  // Status badge with color based on status
  const StatusBadge = ({ status }) => {
    const colors = {
      "APPROVED": "bg-green-100 text-green-800",
      "PENDING": "bg-yellow-100 text-yellow-800",
      "EXPIRED": "bg-red-100 text-red-800",
      "IN_REVIEW": "bg-blue-100 text-blue-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${colors[status] || "bg-gray-200 text-gray-700"}`}>
        {status?.replace("_", " ")}
      </span>
    );
  };

  // Reusable info field component
  const InfoField = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );

  // Render claim details based on type
  const renderClaimDetails = (claim) => {
    // Common details for all claim types
    const commonDetails = (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Claim Details</h4>
            <div className="mt-3 space-y-3">
              <InfoField label="Claim ID" value={claim.id} />
              <InfoField label="Claim Date" value={new Date(claim.date).toLocaleDateString()} />
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <StatusBadge status={claim.etat} />
              </div>
            </div>
          </div>
          
          {/* Type-specific details column */}
          <div>
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1 text-sm">{claim.descriptionSinistre}</p>
          </div>
          </div>
          
          
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-[#476f66] text-white text-sm font-medium rounded-md hover:bg-[#3e6159]">
            View Details
          </button>
        </div>
      </>
    );

    return (
      <div className="p-4 rounded-b-lg">
        {commonDetails}
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    const maxDisplayPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayPages) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={`px-3 py-1 rounded-md ${
              currentPage === number 
                ? 'bg-[#476f66] text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1">...</span>}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Sinistres</h1>
        <div className="flex items-center bg-white p-1 rounded-lg shadow-sm">
          <Filter className="h-4 w-4 text-gray-400 ml-2" />
          <div className="flex space-x-1 ml-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === option
                    ? 'bg-[#476f66] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-4 bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="text-sm font-medium text-gray-500">Object</div>
        <div className="text-sm font-medium text-gray-500">Categorie</div>
        <div className="text-sm font-medium text-gray-500">Status</div>
        <div className="text-sm font-medium text-gray-500 text-right">Amount</div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#476f66]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error loading claims</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : claims.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">No claims found for the selected type.</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {currentClaims.map((claim) => {
              const isExpanded = expandedId === claim.id;

              return (
                <div
                  key={claim.id}
                  className="border border-gray-200 overflow-hidden rounded-md"
                >
                  <div
                    className={`grid grid-cols-4 items-center p-4 cursor-pointer transition-colors ${
                      isExpanded ? 'bg-[#476f66] text-white hover:bg-[#3e6159]' : 'bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : claim.id)}
                  >
                    {/* Column 1: Object + Icon */}
                    <div className="flex items-center">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 mr-2" />
                      ) : (
                        <ChevronDown className="h-5 w-5 mr-2 text-gray-500" />
                      )}
                      <div>
                        <h3 className="font-medium">{claim.objectSinistre}</h3>
                        <p className={`text-sm ${isExpanded ? 'text-gray-200' : 'text-gray-500'}`}>
                          {claim.sinistre_type || claim.categorie} sinistre
                        </p>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="text-sm">{claim.sinistre_type || claim.categorie}</div>

                    {/* Column 3 */}
                    <div className="text-sm">
                      <StatusBadge status={claim.etat} />
                    </div>

                    {/* Column 4 */}
                    <div className="text-right">
                      <p className="font-bold">{claim.amount?.toFixed(2) || '0.00'} TND</p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && renderClaimDetails(claim)}
                </div>
              );
            })}
          </div>
          
          {/* Pagination controls */}
          <Pagination />
          
          {/* Claims count info */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {indexOfFirstClaim + 1}-{Math.min(indexOfLastClaim, claims.length)} of {claims.length} claims
          </div>
        </>
      )}
    </div>
  );
}