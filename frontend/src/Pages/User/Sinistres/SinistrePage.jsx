import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchSinistresDetails } from './SinistresFunction';
import AutoMobileDetails from '../../../Components/SinistresDetailsPage/AutoMobileDetails';
import SanteDetails from '../../../Components/SinistresDetailsPage/SanteDetails';
import HabitationDetails from '../../../Components/SinistresDetailsPage/HabitationDetails';
import GeneralClaimInfo from '../../../Components/SinistresDetailsPage/GeneralClaimInfo';
import ImagesSection from '../../../Components/SinistresDetailsPage/ImagesSection';
import DocumentsSection from '../../../Components/SinistresDetailsPage/DocumentsSection';
import StatusTracker from '../../../Components/SinistresDetailsPage/StatusTracker';
import LoadingSpinner from '../../../Components/LoadingSpinner';

const SinistrePage = () => {
  const [sinistre, setSinistre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSinistre = async () => {
      try {
        const data = await FetchSinistresDetails(id)
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Detaille du Sinistre</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#476f66] p-4 text-white">
          <h2 className="text-xl font-semibold">
            Sinistre - {sinistre.object}
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

export default SinistrePage;