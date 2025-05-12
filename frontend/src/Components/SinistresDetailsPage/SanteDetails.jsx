import React from 'react'

const SanteDetails = ({ sinistre }) => {
  return (
    <div className="mb-6 p-4 bg-green-50 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-green-800">Medical Claim Details</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="mb-2"><span className="font-medium">Hospital:</span> {sinistre.hospitalName}</p>
          <p className="mb-2"><span className="font-medium">Cashless Claim:</span> {sinistre.isCashless ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <p className="mb-2"><span className="font-medium">Diagnosis:</span></p>
          <p className="bg-white p-3 rounded border text-gray-700">{sinistre.diagnosis}</p>
        </div>
      </div>
    </div>
  );
};

export default SanteDetails