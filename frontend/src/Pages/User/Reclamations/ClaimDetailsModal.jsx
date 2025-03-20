import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

const ClaimDetailsModal = ({ claim, formatDate, getStatusColor, getTypeIcon, onClose }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    // Function to handle clicks outside the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    // Add event listener when the modal is shown
    document.addEventListener("mousedown", handleClickOutside);
    
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "auto";
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);
  
  if (!claim) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Claim #{claim.id} Details</h3>
          <button onClick={onClose} className="text-white hover:text-green-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Claim Summary */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center">
                {getTypeIcon(claim.typeReclamation)}
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
            
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-700">{claim.description}</p>
          </div>
          
          {/* Claim Type Information */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Claim Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Type</p>
                <p className="text-green-700 font-medium">{claim.typeReclamation}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="font-medium">{claim.status}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Created Date</p>
                <p className="font-medium">{formatDate(claim.date)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Claim ID</p>
                <p className="font-medium">#{claim.id}</p>
              </div>
            </div>
          </div>
          
          {/* Message History */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Message History</h4>
            {claim.message && claim.message.length > 0 ? (
              <div className="space-y-4">
                {claim.message.map((msg) => (
                  <div key={msg.id} className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-800">{msg.content}</p>
                      <span className="text-xs text-gray-500">
                        {msg.date ? new Date(msg.date).toLocaleString() : 'No date'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No messages available for this claim.</p>
            )}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsModal;