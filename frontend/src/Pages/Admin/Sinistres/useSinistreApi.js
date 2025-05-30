import axiosInstance from '../../../Hooks/TokenInterceptor';
import { useEffect, useState } from 'react';
export const useSinistres = (typeFilter, statusFilter) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
       let endpoint = '/api/sinistre/sinistres';
      if (statusFilter !== 'Tous' && typeFilter !== 'Tous') {
        const { data } = await axiosInstance.get(endpoint);
        
        const filtered = data.filter(r => r.status === statusFilter && r.type === typeFilter);
        
        setClaims(filtered);
      } 
      else if (statusFilter !== 'Tous') {
        let status = "";
        switch(statusFilter) {
          case 'Soumis':
            status = "SOUMIS";
            break;
          case 'En Examen':
            status = "EN_EXAMEN";
            break;
          case 'Rejeté':
            status = "INFOS_COMPLEMENTAIRES_REQUISES";
            break;
          case 'Approuvé':
            status = "APPROUVE";
            break;
          case 'Infos Complementaires Requises':
            status = "REJETE";
            break;
          case 'Payé':
            status = "PAYE";
            break;
          default:
            status = "";
        }
        console.log(status);
        const { data } = await axiosInstance.get(`/api/sinistre/getsinistre/statut/${status}`);
        setClaims(data);
      } 
      else if (typeFilter !== 'Tous') {
        const { data } = await axiosInstance.get(`/api/sinistre/getsinistre/type/${typeFilter}`);
        setClaims(data);
      } 
      else {
        const { data } = await axiosInstance.get(endpoint);
        setClaims(data);
      }
      
    } catch (err) {
      setError("Échec du chargement des réclamations.");
    } finally {
      setLoading(false);
    }
    };

    fetchClaims();
  }, [typeFilter, statusFilter]);

  return { claims, loading, error };
};