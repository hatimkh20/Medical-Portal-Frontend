import { useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRequest = useCallback(async (endpoint) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setLoading(false);
      throw err;
    }
  }, []);

  return { deleteRequest, loading, error };
};

export default useDelete;
