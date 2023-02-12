import { QueryParams } from "../models/queryParams.model";

/**
 * Add query params to the endpoint path if needed.
 * @param {string} endpoint - URL of the endpoint
 * @param {QueryParams} queryParams - QueryParams to add
 * @returns {string} complete URL with query params included
 */
const addQueryParams = (endpoint: string, queryParams?: QueryParams) => {
  return !queryParams
    ? endpoint
    : `${endpoint}?${new URLSearchParams(queryParams)}`;
};

export default addQueryParams;
