import { useMemo } from "react";
import {
  CoachMapped,
  FootbalCoachesApiResponse,
} from "../models/coaches.models";
import { PlayerPosition } from "../models/squads.models";
import { API_ENDPOINTS } from "../utils/config";
import useFetch from "./useFetch";

const useFetchCoaches = (teamId: number) => {
  const { data, isLoading } = useFetch<FootbalCoachesApiResponse>(
    API_ENDPOINTS.coaches,
    {
      team: teamId,
    }
  );

  const mappedCoaches: CoachMapped[] = useMemo(() => {
    return (
      data?.response.map(({ id, name, firstname, lastname, photo, age }) => ({
        id,
        name,
        firstname,
        lastname,
        photo,
        age,
        teamId,
        position: PlayerPosition.Coach,
      })) ?? []
    );
  }, [data]);

  return {
    coaches: mappedCoaches,
    isLoading,
  };
};

export default useFetchCoaches;
