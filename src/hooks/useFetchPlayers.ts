import { useMemo } from "react";
import {
  FootbalSquadsApiResponse,
  PlayerMapped,
} from "../models/squads.models";
import { API_ENDPOINTS } from "../utils/config";
import useFetch from "./useFetch";

const useFetchPlayers = (teamId: number) => {
  const { data, isLoading } = useFetch<FootbalSquadsApiResponse>(
    API_ENDPOINTS.squads,
    {
      team: teamId,
    }
  );

  const mappedPlayers: PlayerMapped[] = useMemo(() => {
    return (
      data?.response[0].players.map(
        ({ id, name, number, position, photo }) => ({
          id,
          name,
          number,
          position,
          photo,
        })
      ) ?? []
    );
  }, [data]);

  return {
    players: mappedPlayers,
    teamName: data?.response[0].team.name,
    isLoading,
  };
};

export default useFetchPlayers;
