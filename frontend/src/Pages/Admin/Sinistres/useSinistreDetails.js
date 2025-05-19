import axiosInstance from '../../../Hooks/TokenInterceptor';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const useSinistresDetails = (activeFilter) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [claim, setClaim] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImage, setActiveImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [aiReport, setAiReport] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    const fetchClaimDetails = async () => {
        setLoading(true);
        try {

          const response = await axiosInstance.get(`/api/sinistre/getsinistre/id/${id}`);
          const data = response.data
          console.log(data)
          setClaim(data);
          if (data.images && data.images.length > 0) setActiveImage(data.images[0].imageUrl);
        } catch (err) {
          setError('Unable to load claim details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
    const handleStatusChange = async (status) => {
    try {
      const response = await axiosInstance.put(
        `/api/sinistre/changeretat/${id}`,
        { etat: status },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setClaim(prev => ({ ...prev, etat: status }));
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

    const generateAIDecision = async () => {
    setAiLoading(true);
    try {
      const response = await axiosInstance.get(`/api/model/generate-response/${claim.id}`);
      if (response.status === 200) {
        setAiReport(response.data.response || JSON.stringify(response.data, null, 2));
        setShowModal(true);
      }
    } catch (err) {
      setAiReport("An error occurred while generating the report.");
    } finally {
      setAiLoading(false);
    }
  };

  return { claim, loading, error, activeImage, showModal , aiReport , aiLoading ,setShowModal, fetchClaimDetails , handleStatusChange , generateAIDecision};
};
