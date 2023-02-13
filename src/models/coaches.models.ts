import { FootballAPIResponse } from "./footballApiResponse.model";
import { TeamMapped } from "./teams.models";

export interface Coach {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: Birth;
  nationality: string;
  height: null | string;
  weight: null | string;
  photo: string;
  team: TeamMapped;
  career: Career[];
}

export type CoachMapped = Pick<
  Coach,
  "id" | "name" | "age" | "photo" | "firstname" | "lastname"
>;

interface Birth {
  date: Date;
  place: null | string;
  country: string;
}

interface Career {
  team: TeamMapped;
  start: Date;
  end: Date | null;
}

export type FootbalCoachesApiResponse = FootballAPIResponse<Coach>;
