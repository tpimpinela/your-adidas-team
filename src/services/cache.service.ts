import daysToMiliseconds from "../helpers/daysToMiliseconds.helper";
import { FootballAPIResponse } from "../models/footballApiResponse.model";
import { HttpCache } from "../models/httpCache.model";
import { CACHE_VALIDITY_DAYS } from "../utils/config";

/**
 * Saves an endpoint on the cache.
 * @param {string} fullEndpoint - URL of the endpoint
 * @param {FootballAPIResponse<T>} dataToCache - Response to cache
 */
export const setCacheData = <T>(
  fullEndpoint: string,
  dataToCache: FootballAPIResponse<T>
) => {
  const actualCache = JSON.parse(localStorage.getItem("cache") ?? "{}");
  const newCache = {
    ...actualCache,
    [fullEndpoint]: {
      ...dataToCache,
      validUntil: new Date(
        new Date().getTime() + daysToMiliseconds(CACHE_VALIDITY_DAYS)
      ),
    },
  };
  localStorage.setItem("cache", JSON.stringify(newCache));
};

/**
 * Get the cache for a specifif endpoint.
 * @param {string} fullEndpoint - URL of the endpoint
 * @returns {FootballAPIResponse<T> | undefined} cached data available
 * on the localStorage.
 */
export const getCachedData = <T>(fullEndpoint: string) => {
  const allCachedData = getAllCachedData();
  if (!allCachedData) return;
  const cachedDataForThisEndpoint = allCachedData[fullEndpoint];
  if (!isCachedDataValid(cachedDataForThisEndpoint)) {
    deleteCachedData(fullEndpoint);
    return;
  }
  return cachedDataForThisEndpoint as FootballAPIResponse<T>;
};

/**
 * Get all the cache available on the localStorage
 * @returns all the endpoints cached on the localStorage
 */
const getAllCachedData = () => {
  const allCachedData = localStorage.getItem("cache");
  if (!allCachedData) return;
  return JSON.parse(allCachedData, validUntilReviver) as HttpCache;
};

/**
 * Delete a specific endpoint from the cache.
 * @param {string} fullEndpoint - Endpoint to delete from the cache
 */
const deleteCachedData = (fullEndpoint: string) => {
  const allCachedData = getAllCachedData();
  if (!allCachedData) return;
  delete allCachedData[fullEndpoint];
  saveAllCachedData(allCachedData);
};

/**
 * Save the full http cache object to the localStorage
 * @param {HttpCache} cache - Cache to save
 */
const saveAllCachedData = (cache: HttpCache) => {
  localStorage.setItem("cache", JSON.stringify(cache));
};

/**
 * Checks if a HTTP cached endpoint is valid or It is stale
 * @param {HttpCache[string]} cachedData - Cache for an endpoint
 * @returns {boolean} indicate if the data is valid or it's stale
 */
const isCachedDataValid = (cachedData: HttpCache[string]) => {
  return new Date() < cachedData.validUntil;
};

/**
 * Reviver function to convert validUntil string to Date object
 * with JSON.parse
 * @param {string} key - Key of the property
 * @param {string} value -  Value of the property
 * @returns date object revived
 */
export const validUntilReviver = (key: string, value: any) => {
  return key === "validUntil" ? new Date(value) : value;
};
