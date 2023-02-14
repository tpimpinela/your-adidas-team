import { describe, expect, it } from "vitest";
import { TeamMember } from "../models/teamMember.model";
import { MAX_PLAYERS_PER_TEAM, MAX_SQUAD_PLAYERS } from "../utils/config";
import getValidations from "./getValidations.helper";

describe("getValidations helper", () => {
  it("should return correct disabled teams", () => {
    const teamIdMock = 9;
    const membersPerTeamIdMock = {
      [teamIdMock]: MAX_PLAYERS_PER_TEAM,
    };
    const result = getValidations([], {}, membersPerTeamIdMock);
    expect(result.disabledTeamIds).toStrictEqual([teamIdMock]);
  });

  it("should return maxPlayers error", () => {
    const squadMock = Array.from({
      length: MAX_SQUAD_PLAYERS + 1,
    }) as TeamMember[];
    const result = getValidations(squadMock, {}, {});
    expect(result).toContain({
      maxPlayers: `The team can only have up to ${MAX_SQUAD_PLAYERS} players`,
    });
  });

  it("should return squadComposition error", () => {
    const membersPerPositionMock = {};
    const result = getValidations([], membersPerPositionMock, {});
    expect(result.squadComposition).toBeTruthy();
  });
});
