import { renderHook, RenderHookResult } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, describe, Mock, vi, it, expect } from "vitest";
import squadMock from "../mocks/squads.mock";
import { TeamMember } from "../models/teamMember.model";
import { MyOwnSquadActionType } from "../reducers/myOwnSquad.reducer";
import useMyOwnSquadDispatcher from "./useMyOwnSquadDispatcher";

vi.mock("react", async () => {
  const actual: object = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe("useMyOwnSquadDispatcher", () => {
  let renderHookResult: RenderHookResult<
    ReturnType<typeof useMyOwnSquadDispatcher>,
    any
  >;
  const useContextMock = useContext as Mock<any, any>;
  const dispatchMock = vi.fn();

  beforeEach(() => {
    useContextMock.mockReturnValue(dispatchMock);
    dispatchMock.mockReset();
    renderHookResult = renderHook(() => useMyOwnSquadDispatcher());
  });

  it("should return utility functions", () => {
    expect(renderHookResult.result.current).toStrictEqual({
      addTeamMember: expect.any(Function),
      deleteTeamMember: expect.any(Function),
    });
  });

  it("should add team member", () => {
    const { addTeamMember } = renderHookResult.result.current;
    addTeamMember(squadMock.players[0] as unknown as TeamMember);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, {
      type: MyOwnSquadActionType.Add,
      payload: squadMock.players[0],
    });
  });

  it("should delete team member", () => {
    const { deleteTeamMember } = renderHookResult.result.current;
    deleteTeamMember(squadMock.players[0].id);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, {
      type: MyOwnSquadActionType.Delete,
      payload: squadMock.players[0].id,
    });
  });
});
