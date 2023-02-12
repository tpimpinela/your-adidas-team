import { FootbalTeamsApiResponse } from "../models/teams.models";
import { API_ENDPOINTS, LEAGUE, SEASON } from "../utils/config";
import useFetch from "./useFetch";

const useFetchTeams = () => {
  const { data, isLoading } = useFetch<FootbalTeamsApiResponse>(
    API_ENDPOINTS.teams,
    {
      league: LEAGUE,
      season: SEASON,
    }
  );

  return {
    teams: data?.response,
    isLoading,
  };
};

export default useFetchTeams;
