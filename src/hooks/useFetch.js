import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constant';

const useFetch = (endpoint, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      console.log("endpoint: ", endpoint)

      const response = await axios.get(BASE_URL + endpoint, {
          ...options,
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, options]);

  return { data, loading, error, setData, refetch: fetchData};
};

export default useFetch;
