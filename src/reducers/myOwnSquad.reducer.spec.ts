import { describe, expect, it } from "vitest";
import squadMock from "../mocks/squads.mock";
import { TeamMember } from "../models/teamMember.model";
import {
  MyOwnSquadAction,
  MyOwnSquadActionType,
  myOwnSquadReducer,
} from "./myOwnSquad.reducer";

describe("myOwnSquadReducer", () => {
  const initialState: TeamMember[] = [];

  it("should add one team member to the state", () => {
    const action: MyOwnSquadAction = {
      type: MyOwnSquadActionType.Add,
      payload: squadMock.players[0],
    };
    const result = myOwnSquadReducer(initialState, action);
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual(squadMock.players[0]);
  });

  it("should delete one team member from the state", () => {
    const action: MyOwnSquadAction = {
      type: MyOwnSquadActionType.Delete,
      payload: squadMock.players[0].id,
    };
    const result = myOwnSquadReducer([squadMock.players[0]], action);
    expect(result.length).toBe(0);
  });
});
