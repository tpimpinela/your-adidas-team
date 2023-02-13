import { FootballAPIResponse } from "./footballApiResponse.model";
import { TeamMapped } from "./teams.models";

export interface Squad {
  team: TeamMapped;
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  age: number;
  number: number;
  position: PlayerPosition;
  photo: string;
}

export type PlayerMapped = Pick<
  Player,
  "id" | "name" | "number" | "position" | "photo"
>;

export enum PlayerPosition {
  Attacker = "Attacker",
  Defender = "Defender",
  Goalkeeper = "Goalkeeper",
  Midfielder = "Midfielder",
}

export type FootbalSquadsApiResponse = FootballAPIResponse<Squad>;
