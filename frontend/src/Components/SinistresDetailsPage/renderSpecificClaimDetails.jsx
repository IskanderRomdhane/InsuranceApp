import React from 'react'

const renderSpecificClaimDetails = () => {
    if ('propertyAddress' in sinistre) {
      return <HabitationDetails sinistre={sinistre} />;
    } else if ('hospitalName' in sinistre) {
      return <SanteDetails sinistre={sinistre} />;
    } else if ('Matricule' in sinistre) {
      return <AutoMobileDetails sinistre={sinistre} />;
    }
    return null;


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Claim Details</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#476f66] p-4 text-white">
          <h2 className="text-xl font-semibold">
            Claim #{sinistre.id} - {sinistre.object}
          </h2>
        </div>
        
        <div className="p-6">
          <GeneralClaimInfo sinistre={sinistre} />
          {renderSpecificClaimDetails()}
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <ImagesSection images={sinistre.images} />
            <DocumentsSection documents={sinistre.document} />
          </div>
          
          <StatusTracker state={sinistre.etat} />
        </div>
      </div>
    </div>
  );
};

export default renderSpecificClaimDetails