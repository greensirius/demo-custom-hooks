import { useEffect, useReducer, useRef } from "react";

const useFetcher = (url, options) => {
  const cancelRequest = useRef(false);
  const reqCache = useRef({});
  const initialState = {
    isLoading: false,
    error: undefined,
    data: undefined
  };

  const fetchReducers = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...initialState, isLoading: true };
      case "fetching":
        return { ...initialState, isLoading: false, data: action.payload };
      case "error":
        return { ...initialState, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducers, initialState);

  useEffect(() => {
    if (!url) return;
    cancelRequest.current = false;
    if (reqCache.current[url]) {
      dispatch({ type: "fetching", payload: reqCache.current[url] });
    }
    const fetchData = async () => {
      dispatch({ type: "loading" });
      console.log("laoding");
      try {
        const response = await fetch(url, options);
        console.log("fetching");
        if (!response.ok) {
          console.log("error");
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log({ data });
        reqCache.current[url] = data;
        if (cancelRequest.current) return;
        dispatch({ type: "fetching", payload: data });
      } catch (error) {
        console.log("errpr");
        if (cancelRequest.current) return;
        dispatch({ type: "error", payload: error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, options]);

  console.log("ye: ", { state });
  return state;
};

export default useFetcher;
