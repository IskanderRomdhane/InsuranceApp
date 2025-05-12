import React from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';
import { formatDate, getStatusColor, getDivBorderColor, getTypeIcon } from '../../Pages/User/Reclamations/ReclamationProp';

const ReclamationFields = ({ 
  displayClaims, 
  setSearchTerm, 
  setFilter, 
  handleViewDetails 
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {displayClaims.length > 0 ? displayClaims.map(claim => (
        <div key={claim.id} className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${getDivBorderColor(claim.status)} hover:shadow-lg transition-shadow`}>
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
  );
};

export default ReclamationFields;