import { TeamMember } from "../models/teamMember.model";
import { SquadValidation } from "../models/validation.model";
import {
  MAX_PLAYERS_PER_TEAM,
  MAX_SQUAD_PLAYERS,
  MIN_SQUAD_POSITIONS,
} from "../utils/config";

/**
 * Validate if the current squad is valid.
 * @param {TeamMember[]} squad - Actual squad
 * @param {{[key: string]: number}} membersPerPosition - Map of the members
 * classified by position.
 * @param {[key: number]: number} membersPerTeamId - Map of the members classified
 * by teamId
 * @returns {SquadValidation} object containing the errors and their message and the list of the
 * teams that need to be disabled.
 */
const getValidations = (
  squad: TeamMember[],
  membersPerPosition: { [key: string]: number },
  membersPerTeamId: { [teamId: number]: number }
) => {
  const validationsObj: SquadValidation = {};
  if (squad.length > MAX_SQUAD_PLAYERS) {
    validationsObj[
      "maxPlayers"
    ] = `The team can only have up to ${MAX_SQUAD_PLAYERS} players`;
  }
  let squadComposition = "";
  Object.entries(MIN_SQUAD_POSITIONS).forEach(([position, minValue]) => {
    if (membersPerPosition[position] >= minValue) return;
    squadComposition += `${
      squadComposition ? "\n." : ""
    }The team should have at least ${minValue} ${position}`;
  });
  if (squadComposition) {
    validationsObj["squadComposition"] = squadComposition;
  }
  const disabledTeamIds = Object.entries(membersPerTeamId)
    .filter(([, numberOfPlayers]) => numberOfPlayers >= MAX_PLAYERS_PER_TEAM)
    .map(([teamId]) => parseInt(teamId));
  if (disabledTeamIds.length > 0) {
    validationsObj["disabledTeamIds"] = [...disabledTeamIds];
  }

  return validationsObj;
};

export default getValidations;
