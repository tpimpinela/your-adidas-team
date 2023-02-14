import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LoaderDispatchContext } from "../contexts/Loader.context";
import addQueryParams from "../helpers/addQueryParams.helper";
import { FootballAPIResponse } from "../models/footballApiResponse.model";
import { QueryParams } from "../models/queryParams.model";
import { getCachedData, setCacheData } from "../services/cache.service";
import { API_KEY } from "../utils/config";

/**
 * Hook to make get request to an endpoint and cache It.
 * If the endpoint is available on cache the response will be served
 * from the cache.
 * @param {string} endpoint - URL of the endpoint
 * @param {QueryParams} - Query params to add to the request
 * @param {RequestInit['headers']} - Additional headers to add to the request (auth is added automatically)
 * @returns object with isLoading state and the fetched data.
 */
const useFetch = <T extends FootballAPIResponse<any>>(
  endpoint: string,
  queryParams?: QueryParams,
  headers?: RequestInit["headers"]
) => {
  const [isLoading, setIsLoading] = useState(true);
  const loaderDispatcher = useContext(LoaderDispatchContext);
  const [data, setData] = useState<T>();
  const endpointWithParams = useMemo(
    () => addQueryParams(endpoint, queryParams),
    [endpoint, queryParams]
  );
  const finalHeaders = useMemo(
    () => ({
      ...headers,
      "X-RapidAPI-Key": API_KEY,
    }),
    [headers]
  );
  const cache = useMemo(
    () => getCachedData<T>(endpointWithParams),
    [endpointWithParams]
  );
  const saveCache = useCallback(
    (data: FootballAPIResponse<T>) => setCacheData(endpointWithParams, data),
    [endpointWithParams]
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      loaderDispatcher(true);
      let data: T;
      if (cache) {
        data = cache as T;
      } else {
        const response = await fetch(endpointWithParams, {
          headers: finalHeaders,
        });
        data = (await response.json()) as T;
      }
      setData(data);
      saveCache(data);
      setIsLoading(false);
      loaderDispatcher(false);
      return data;
    }
    fetchData();
  }, [endpointWithParams, finalHeaders]);

  return {
    isLoading,
    data,
  };
};

export default useFetch;
