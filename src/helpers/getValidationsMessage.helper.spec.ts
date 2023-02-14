import { describe, expect, it } from "vitest";
import { SquadValidation } from "../models/validation.model";
import getValidationMessage from "./getValidationsMessage.helper";

describe("getValidationsMessage helper", () => {
  it("should return the correct validation message", () => {
    const squadValidationMock: SquadValidation = {
      disabledTeamIds: [9],
      maxPlayers: "Max players",
      squadComposition: "Squad composition",
    };
    const result = getValidationMessage(squadValidationMock);
    expect(result).toBe(
      `${squadValidationMock.maxPlayers}\n${squadValidationMock.squadComposition}`
    );
  });
});
