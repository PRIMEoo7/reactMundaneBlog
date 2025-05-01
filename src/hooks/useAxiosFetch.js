import { useState, useEffect, useRef } from "react";
import axios from "axios";
const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    isMounted.current = true;
    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        const responseData = response.data;
        if (isMounted.current) {
          setData(responseData);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted.current) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted.current && setIsLoading(false);
      }
    };
    fetchData(dataUrl);

    return () => {
      console.log("cleanup function");
      isMounted.current = false;
      source.cancel();
    };
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
