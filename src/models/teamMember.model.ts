import { CoachMapped } from "./coaches.models";
import { PlayerMapped } from "./squads.models";

export type TeamMember = PlayerMapped | CoachMapped;
