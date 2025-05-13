import { useEffect, useState } from 'react';
import axiosInstance from '../../../Hooks/TokenInterceptor';

export const useSinistres = (activeFilter) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const url = activeFilter === 'Tous'
          ? '/api/sinistre/sinistres'
          : `/api/sinistre/getsinistre/type/${activeFilter}`;
        console.log(activeFilter)
        const response = await axiosInstance.get(url);
        setClaims(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [activeFilter]);

  return { claims, loading, error };
};
