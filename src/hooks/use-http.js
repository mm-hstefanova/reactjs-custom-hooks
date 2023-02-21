import { useState, useEffect, useCallback } from 'react';

const defaultHttpOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const useHttp = (url, httpOptions = defaultHttpOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, httpOptions);

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const responseData = await response.json();

      setData(responseData);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return [data, isLoading, error];
};

export default useHttp;
