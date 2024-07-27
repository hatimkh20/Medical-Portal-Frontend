import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constant';

const usePost = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = useCallback(
    async (payload, config = {}) => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token'); // Get the token from localStorage

      try {
        const response = await axios.post(BASE_URL + endpoint, payload, {
          ...options,
          ...config,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        setData(response.data);
        
        return response.data;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  return { data, loading, error, postRequest };
};

export default usePost;
