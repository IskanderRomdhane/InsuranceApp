import React from 'react';
import { ArrowRight } from 'lucide-react';

const ClaimsModal = ({ claim, formatDate, StatusIndicator, viewDetails, onClose }) => {
  if (!claim) return null;
  
  // Stop propagation to prevent closing when clicking inside the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close when clicking the backdrop
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="bg-[#476f66] text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="text-lg font-medium">Claim Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Claim Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Claim ID</p>
                  <p className="font-medium">{claim.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Object</p>
                  <p className="font-medium">{claim.objectSinistre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{claim.sinistre_type || claim.categorie}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(claim.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{claim.amount?.toFixed(2) || '0.00'} TND</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <StatusIndicator status={claim.etat} />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Description</h4>
              <p className="text-gray-600">{claim.descriptionSinistre}</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
          <button 
            className="bg-[#476f66] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors flex items-center"
            onClick={() => viewDetails(claim.id)}
          >
            View Full Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimsModal;