export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_ENDPOINTS = {
  baseUrl: "https://api-football-v1.p.rapidapi.com/v3",
  get teams() {
    return `${this.baseUrl}/teams`;
  },
};
export const LEAGUE = 1;
export const SEASON = 2022;
export const CACHE_VALIDITY_DAYS = 7;
