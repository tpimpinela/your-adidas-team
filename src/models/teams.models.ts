import { FootballAPIResponse } from "./footballApiResponse.model";

export interface TeamInfo {
  team: Team;
  venue: Venue;
}

export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export type TeamMapped = Pick<Team, "id" | "name" | "logo">;

interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export type FootbalTeamsApiResponse = FootballAPIResponse<TeamInfo>;
