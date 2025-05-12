import React from 'react'

const GeneralClaimInfo = ({ sinistre }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-[#476f66]">General Information</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="mb-2"><span className="font-medium">Date:</span> {formatDate(sinistre.date)}</p>
          <p className="mb-2"><span className="font-medium">Status:</span> {sinistre.etat}</p>
          <p className="mb-2"><span className="font-medium">Amount:</span> ${sinistre.amount?.toFixed(2) || 'N/A'}</p>
        </div>
        
        <div>
          <p className="mb-2"><span className="font-medium">Description:</span></p>
          <p className="bg-white p-3 rounded border text-gray-700">{sinistre.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralClaimInfo