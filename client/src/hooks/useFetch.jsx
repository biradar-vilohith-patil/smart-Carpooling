import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URI;

const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!endpoint) return;  // Important: don't fetch if endpoint is null

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/${endpoint}`, { withCredentials: true });
        setData(res.data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { loading, data, error };
};

export default useFetch;
