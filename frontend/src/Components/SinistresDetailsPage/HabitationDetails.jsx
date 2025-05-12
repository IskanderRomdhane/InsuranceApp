import React from 'react'

const HabitationDetails = ({ sinistre }) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-blue-800">Property Damage Details</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="mb-2"><span className="font-medium">Property Address:</span> {sinistre.propertyAddress}</p>
        </div>
        <div>
          <p className="mb-2"><span className="font-medium">Damage Type:</span> {sinistre.damageType}</p>
        </div>
      </div>
    </div>
  );
};


export default HabitationDetails