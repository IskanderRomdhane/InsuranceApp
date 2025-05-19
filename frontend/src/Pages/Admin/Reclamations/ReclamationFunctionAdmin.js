import { useState, useEffect } from 'react';
import axiosInstance from '../../../Hooks/TokenInterceptor';
export const useReclamationDetails = (claimId) => {
  const [reclamation, setReclamation] = useState(null);
  const [statut, setStatut] = useState("EN_ATTENTE");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  
  const updateStatus = async (newStatus) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(
        `/api/reclamation/changerstatus/${claimId}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
      setReclamation(prev => ({ ...prev, status: newStatus }));
      setStatut(newStatus);
    } catch (err) {
      setError("Échec de la mise à jour du statut");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchReclamationDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `http://localhost:8081/api/reclamation/getreclamation/${claimId}`
        );
        
        setReclamation(response.data);
        setStatut(response.data.status);
        
        if (response.data.imageUrl?.length > 0) {
          setActiveImage(response.data.imageUrl[0]);
        }
      } catch (err) {
        setError("Failed to fetch reclamation details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (claimId) fetchReclamationDetails();
  }, [claimId]);

  return {
    reclamation,
    statut,
    isLoading,
    error,
    activeImage,
    setActiveImage,
    setStatut,
    updateStatus
  };
};

export const useReclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [filteredReclamations, setFilteredReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchReclamations = async (status = 'ALL', type = 'ALL') => {
    setLoading(true);
    try {
      let endpoint = '/api/reclamation/getusersrelamations';
      if (status !== 'ALL' && type !== 'ALL') {
        const { data } = await axiosInstance.get('/api/reclamation/getusersrelamations');
        const filtered = data.filter(r => r.status === status && r.type === type);
        setReclamations(data);
        setFilteredReclamations(filtered);
      } 
      else if (status !== 'ALL') {
        const { data } = await axiosInstance.get(`/api/reclamation/getreclamation/status/${status}`);
        setReclamations(data);
        setFilteredReclamations(data);
      } 
      else if (type !== 'ALL') {
        const { data } = await axiosInstance.get(`/api/reclamation/getreclamation/type/${type}`);
        setReclamations(data);
        setFilteredReclamations(data);
      } 
      else {
        const { data } = await axiosInstance.get(endpoint);
        setReclamations(data);
        setFilteredReclamations(data);
      }
      
    } catch (err) {
      setError("Échec du chargement des réclamations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);

  useEffect(() => {
    // When status filter changes, fetch from API
    if (statusFilter !== 'ALL' || typeFilter !== 'ALL') {
      fetchReclamations(statusFilter, typeFilter);
    } else {
      fetchReclamations();
    }
  }, [statusFilter, typeFilter]);

  return {
    reclamations,
    filteredReclamations,
    loading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    fetchReclamations
  };
};