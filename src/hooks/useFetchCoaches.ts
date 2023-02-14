import { useMemo } from "react";
import { FootbalCoachesApiResponse } from "../models/coaches.models";
import { API_ENDPOINTS } from "../utils/config";
import useFetch from "./useFetch";

const useFetchCoaches = (teamId: number) => {
  const { data, isLoading } = useFetch<FootbalCoachesApiResponse>(
    API_ENDPOINTS.coaches,
    {
      team: teamId,
    }
  );

  const mappedCoaches = useMemo(() => {
    return data?.response.map(
      ({ id, name, firstname, lastname, photo, age }) => ({
        id,
        name,
        firstname,
        lastname,
        photo,
        age,
        teamId,
      })
    );
  }, [data]);

  return {
    coaches: mappedCoaches,
    isLoading,
  };
};

export default useFetchCoaches;
