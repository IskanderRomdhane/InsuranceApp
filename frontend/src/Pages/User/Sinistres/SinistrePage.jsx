import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Main component
const SinistrePage = () => {
  const [sinistre, setSinistre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSinistre = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/sinistre/getsinistre/id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch claim details');
        }
        const data = await response.json();
        setSinistre(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSinistre();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!sinistre) {
    return <div className="p-6 text-center">No claim found</div>;
  }

  // Determine which specific claim type component to render
  const renderSpecificClaimDetails = () => {
    if ('propertyAddress' in sinistre) {
      return <HabitationDetails sinistre={sinistre} />;
    } else if ('hospitalName' in sinistre) {
      return <SanteDetails sinistre={sinistre} />;
    } else if ('Matricule' in sinistre) {
      return <AutoMobileDetails sinistre={sinistre} />;
    }
    return null;
  };

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

// Component for general claim information
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

// Component for Habitation claims
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

// Component for Sante (Health) claims
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

// Component for AutoMobile claims
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

// Component for images section
const ImagesSection = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Images</h3>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Images</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {images.map((image) => (
          <div key={image.id} className="bg-white p-2 rounded border">
            <img 
              src={image.imageUrl || "/api/placeholder/300/200"} 
              alt={image.name || "Claim image"} 
              className="w-full h-32 object-cover rounded mb-2" 
            />
            <p className="text-sm text-gray-600 truncate">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for documents section
const DocumentsSection = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Documents</h3>
        <p className="text-gray-500">No documents available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Documents</h3>
      
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id} className="bg-white p-3 rounded border flex items-center">
            <div className="p-2 bg-[#476f66] text-white rounded mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <a 
              href={doc.documentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#476f66] hover:underline truncate"
            >
              {doc.documentName || "Document"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for tracking claim status
const StatusTracker = ({ state }) => {
  // Define possible states in order
  const states = ["SUBMITTED", "IN_REVIEW", "ADDITIONAL_INFO_REQUIRED", "APPROVED", "REJECTED", "PAID"];
  
  // Find the current state index
  const currentStateIndex = states.findIndex(s => s === state);
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-[#476f66]">Claim Status</h3>
      
      <div className="flex items-center justify-between mb-2">
        {states.map((s, index) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index <= currentStateIndex ? 'bg-[#476f66] text-white' : 'bg-gray-200'
            }`}>
              {index <= currentStateIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xs mt-1 whitespace-nowrap">
              {s.replace(/_/g, ' ').toLowerCase()}
            </span>
          </div>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div 
          className="bg-[#476f66] h-2 rounded-full" 
          style={{ width: `${(currentStateIndex / (states.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#476f66]"></div>
    </div>
  );
};

// Error message component
const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative m-6" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default SinistrePage;