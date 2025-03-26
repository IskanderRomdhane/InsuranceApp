import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, AlertCircle, CheckCircle, Clock, FileText, X, Mail, User, Calendar, Tag, Info } from 'lucide-react';
import ReclamationDetails from './ReclamationDetails'
import { Link, useNavigate } from 'react-router-dom';
const ReclamationsTable = () => {
    const [claims, setClaims] = useState([]);
    const [filteredClaims, setFilteredClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [typeFilter, setTypeFilter] = useState('ALL');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const ClickHandler = (id) => {
        navigate(`/admin/reclamation/${id}`);
    }   

    const fetchClaims = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:8081/api/reclamation/getusersrelamations');
        if (!response.ok) {
          throw new Error('Failed to fetch claims');
        }
        const data = await response.json();
        setClaims(data);
        setFilteredClaims(data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch claims. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchClaims();
    }, []);
  
    useEffect(() => {
      let result = claims;
      
      if (searchTerm) {
        result = result.filter(claim => 
          claim.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          claim.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.id.toString().includes(searchTerm)
        );
      }
      
      if (statusFilter !== 'ALL') {
        result = result.filter(claim => claim.status === statusFilter);
      }
      
      if (typeFilter !== 'ALL') {
        result = result.filter(claim => claim.type === typeFilter);
      }
      
      setFilteredClaims(result);
    }, [searchTerm, statusFilter, typeFilter, claims]);
  
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString();
    };
  
    const getStatusIcon = (status) => {
      switch (status) {
        case 'PENDING':
          return <Clock className="text-yellow-500" />;
        case 'UNDER_REVIEW':
          return <FileText className="text-blue-500" />;
        case 'CANCELLED':
          return <AlertCircle className="text-red-500" />;
        case 'FINISHED':
          return <CheckCircle className="text-green-500" />;
        default:
          return null;
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm min-h-screen">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Insurance Claims</h1>
        
        {/* Search and filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Search claims..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="relative">
            <select
              className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="FINISHED">Finished</option>
            </select>
            <Filter className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="relative">
            <select
              className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">All Types</option>
              <option value="SERVICE_DELAY">Service Delay</option>
              <option value="ACCOUNT_ACCESS">Account Access</option>
              <option value="UNRESOLVED_ISSUE">Unresolved Issue</option>
              <option value="POOR_SUPPORT">Poor Support</option>
            </select>
            <Filter className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        {/* Refresh button */}
        <div className="mb-6">
          <button 
            className="flex items-center justify-center bg-green-100 text-green-800 font-medium py-2 px-4 rounded-md hover:bg-green-200 transition-colors"
            onClick={fetchClaims}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Claims
          </button>
        </div>
  
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
        
        {/* Claims table */}
        <div className="w-full overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
          ) : filteredClaims.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No claims found.
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">User</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClaims.map((claim) => (
                
                  <tr key={claim.id} className="hover:bg-green-50"
                  onClick={() => ClickHandler(claim.id)}>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{claim.fullName || 'Unknown'}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.type?.replace(/_/g, ' ') || 'Unknown'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {getStatusIcon(claim.status)}
                        <span className="ml-1 text-sm text-gray-500 ">{claim.status?.replace(/_/g, ' ') || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{formatDate(claim.date)}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 max-w-xs truncate">
                      {claim.description || 'No description'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
}

export default ReclamationsTable