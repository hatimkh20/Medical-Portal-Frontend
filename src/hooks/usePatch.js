import { useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

const usePatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchRequest = useCallback(async (endpoint, data) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(`${BASE_URL}${endpoint}`, data, {
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

  return { patchRequest, loading, error };
};

export default usePatch;