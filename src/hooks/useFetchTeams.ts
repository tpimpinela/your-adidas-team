import { useMemo } from "react";
import { FootbalTeamsApiResponse, TeamMapped } from "../models/teams.models";
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

  const mappedTeams: TeamMapped[] = useMemo(() => {
    return (
      data?.response.map(({ team: { id, name, logo } }) => ({
        id,
        name,
        logo,
      })) ?? []
    );
  }, [data]);

  return {
    teams: mappedTeams,
    isLoading,
  };
};

export default useFetchTeams;
