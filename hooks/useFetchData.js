import axios from "axios";
import { useEffect, useState } from "react";

// https://upmostly.com/tutorials/how-to-use-react-hooks-to-fetch-data
const useFetchData = (
  requestConfig, // Axios request config
) => {
  const localRequestConfig = requestConfig || {};
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });
  if (!localRequestConfig?.method) {
    localRequestConfig.method = 'GET';
  }
  useEffect(() => {
    if (localRequestConfig.url) {
      axios(localRequestConfig)
        .then((res) => {
          setState(prevState => ({
            ...prevState,
            data: res.data,
          }))
        })
        .catch((err) => {
          setState(prevState => ({
            ...prevState,
            error: err,
          }))
        })
        .finally(() => {
          setState(prevState => ({
            ...prevState,
            loading: false,
          }))
        });
    } else {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: new Error('No URL provided!'),
      }));
    }
    return state;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestConfig]);
};
export default useFetchData;