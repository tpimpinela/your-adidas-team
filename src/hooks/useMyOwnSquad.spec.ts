import { renderHook, RenderHookResult } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, describe, expect, Mock, vi, it } from "vitest";
import { MyOwnSquadContext } from "../contexts/MyOwnSquad.context";
import { TeamMember } from "../models/teamMember.model";
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
    expect(renderHookResult.result.current).toBe(myOwnSquadMock);
  });
});
