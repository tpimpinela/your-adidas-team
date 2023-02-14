import { renderHook, RenderHookResult, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, describe, expect, Mock, vi, it } from "vitest";
import { MyOwnSquadContext } from "../contexts/MyOwnSquad.context";
import getValidations from "../helpers/getValidations.helper";
import getValidationMessage from "../helpers/getValidationsMessage.helper";
import squadMock from "../mocks/squads.mock";
import { TeamMember } from "../models/teamMember.model";
import { SquadValidation } from "../models/validation.model";
import useMyOwnSquad from "./useMyOwnSquad";

vi.mock("react", async () => {
  const actual: object = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn(),
  };
});
describe("useMyOwnSquad", () => {
  let renderHookResult: RenderHookResult<ReturnType<typeof useMyOwnSquad>, any>;
  const useContextMock = useContext as Mock<any, any>;
  const myOwnSquadMock: TeamMember[] = [];

  beforeEach(() => {
    useContextMock.mockReturnValue(myOwnSquadMock);
    renderHookResult = renderHook(() => useMyOwnSquad());
  });

  it("should return myOwnSquad context", () => {
    expect(useContext).toHaveBeenNthCalledWith(1, MyOwnSquadContext);
    expect(renderHookResult.result.current.squad).toBe(myOwnSquadMock);
  });

  describe("a function to check if a member is already included in the squad", () => {
    it("should return it", () => {
      expect(renderHookResult.result.current.isMemberOnMySquad).toBeTypeOf(
        "function"
      );
    });

    it("should return true if the member is already in the squad", () => {
      useContextMock.mockReturnValue([squadMock.players[0]]);
      renderHookResult.rerender();
      const { isMemberOnMySquad } = renderHookResult.result.current;
      expect(isMemberOnMySquad(squadMock.players[0].id)).toBeTruthy();
    });

    it("should return false if the member is not included in the squad", () => {
      const { isMemberOnMySquad } = renderHookResult.result.current;
      expect(isMemberOnMySquad(squadMock.players[0].id)).toBeFalsy();
    });
  });

  it("should return validations", () => {
    expect(renderHookResult.result.current.validations).toBeTruthy();
  });

  it("should return validationsMessage", () => {
    expect(renderHookResult.result.current.validationsMessage).toBeTruthy();
  });
});
