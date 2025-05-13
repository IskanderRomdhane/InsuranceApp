import React from 'react'

const AutoMobileDetails = ({ sinistre }) => {
  return (
    <div className="mb-6 p-4 bg-orange-50 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-orange-800">Vehicle Claim Details</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="mb-2"><span className="font-medium">Vehicle Registration:</span> {sinistre.Matricule}</p>
        </div>
        <div>
          <p className="mb-2"><span className="font-medium">Incident Location:</span> {sinistre.Location}</p>
        </div>
      </div>
    </div>
  );
};

export default AutoMobileDetails