import { useState, useEffect, useCallback } from 'react';

// const useHttp = (requestConfig, applyData) => {
const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const sendRequest = useCallback(async () => {

  //   when we add requestConfig here as a parameter of the sendRequest, it's no longer external dependency of the useHttp hook
  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.header : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const responseData = await response.json();
        applyData(responseData);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }

      setIsLoading(false);
      // the dependency array should have requestConfig and applyData because they are external dependencies used in the body
      // on the other hand, they are both type object and we need to ensure they won't be recreated,
      // so where we use the useHttp, we need to wrap them in useCallback hook
    },
    // [requestConfig, applyData]
    [applyData]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

// const defaultHttpOptions = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// const useHttp = (url, httpOptions = defaultHttpOptions) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, httpOptions);

//       if (!response.ok) {
//         throw new Error('Request failed!');
//       }

//       const responseData = await response.json();

//       setData(responseData);
//     } catch (err) {
//       setError(err.message || 'Something went wrong!');
//     }

//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return [data, isLoading, error];
// };

// export default useHttp;
