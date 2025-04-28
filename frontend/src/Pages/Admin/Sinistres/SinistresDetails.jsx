import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Image as ImageIcon, Download } from 'lucide-react';
import axios from 'axios';
const SinistresDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchClaimDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/api/sinistre/getsinistre/id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch claim details');
        }
        const data = await response.json();
        setClaim(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0].imageUrl);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load claim details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClaimDetails();
    }
  }, [id]);

  const handleStatusChange = async (status) => {
    console.log(JSON.stringify(status));
    try {
      const url = `http://localhost:8081/api/sinistre/changeretat/${id}`;
      await axios.put(
        url,
         {etat : status} ,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      setClaim(prev => ({
        ...prev,
        etat: newStatus
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
          <button 
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => navigate('/admin/sinistre')}
          >
            Return to Claims List
          </button>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">No claim found with the provided ID.</p>
          <button 
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate('/admin/sinistre')}
          >
            Return to Claims List
          </button>
        </div>
      </div>
    );
  }

  const hasImages = claim.images && claim.images.length > 0;
  const hasDocuments = claim.document && claim.document.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/admin/sinistre')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Claims List</span>
        </button>
        <h1 className="text-2xl font-bold mt-2">Claim Details</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">{claim.object || claim.objectSinistre}</h2>
            <p className="text-sm text-gray-500">ID: {claim.id}</p>
          </div>
          <div className="flex items-center">
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(claim.etat)}`}>
              {claim.etat?.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic information card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Claim Object</p>
                <p className="font-medium">{claim.object || claim.objectSinistre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{claim.amount?.toFixed(2) || '0.00'} TND</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Submitted</p>
                <p className="font-medium">{new Date(claim.date).toLocaleDateString()} {new Date(claim.date).toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Claim ID</p>
                <p className="font-medium">{claim.id}</p>
              </div>
              {claim.matricule && (
                <div>
                  <p className="text-sm text-gray-500">License Plate</p>
                  <p className="font-medium">{claim.matricule}</p>
                </div>
              )}
              {claim.location && (
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{claim.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{claim.description || claim.descriptionSinistre}</p>
          </div>

          {/* Images section */}
          {hasImages && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">
                <div className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Supporting Images
                </div>
              </h3>
              
              <div className="mt-4">
                {/* Main image display */}
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={activeImage} 
                    alt="Claim evidence" 
                    className="w-full h-64 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/400/320";
                    }}
                  />
                </div>
                
                {/* Thumbnail selector */}
                {claim.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {claim.images.map((image, index) => (
                      <div 
                        key={image.id} 
                        className={`w-16 h-16 rounded-md border-2 overflow-hidden cursor-pointer ${
                          activeImage === image.imageUrl ? 'border-blue-600' : 'border-gray-200'
                        }`}
                        onClick={() => setActiveImage(image.imageUrl)}
                      >
                        <img 
                          src={image.imageUrl} 
                          alt={`Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/100/100";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents section */}
          {hasDocuments && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-600" />
                  Supporting Documents
                </div>
              </h3>
              
              <div className="space-y-3">
                {claim.document.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium">{doc.documentName}</p>
                        <p className="text-xs text-gray-500">Document ID: {doc.id}</p>
                      </div>
                    </div>
                    <a 
                      href={doc.documentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>

        {/* Right column - actions and status */}
        <div className="space-y-6">
          {/* Status card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Status Actions</h3>
            <div className="space-y-3">
              <button 
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  claim.etat === 'ACCEPTED' 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                disabled={claim.etat === 'ACCEPTED'}
                onClick={() => handleStatusChange('ACCEPTED')}
              >
                Accept Claim
              </button>
              <button 
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  claim.etat === 'UNDER_REVIEW' 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={claim.etat === 'UNDER_REVIEW'}
                onClick={() => handleStatusChange('UNDER_REVIEW')}
              >
                Mark as Under Review
              </button>
              <button 
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  claim.etat === 'REJECTED' 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={claim.etat === 'REJECTED'}
                onClick={() => handleStatusChange('REJECTED')}
              >
                Reject Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinistresDetails;