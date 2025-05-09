import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constant';

const useFetch = (endpoint, options, mapper, defaultData) => { 
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {

      if(!endpoint) {
        setData(defaultData);
        return;
      };

      const response = await axios.get(BASE_URL + endpoint, {
          ...options,
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      if(mapper){
        console.log("mapping...")
        setData(mapper(response.data.data));
      }
      else
        setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    console.log("use effect calling for fetching")
    fetchData();

    return () => {
      abortController.abort();
    }
  }, [endpoint, options]);

  return { data, loading, error, setData, refetch: fetchData};
};

export default useFetch;
