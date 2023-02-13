import { renderHook, RenderHookResult } from "@testing-library/react";
import { beforeEach, describe, expect, vi, it } from "vitest";
import squadMock from "../mocks/squads.mock";
import { API_ENDPOINTS } from "../utils/config";
import useFetch from "./useFetch";
import useFetchPlayers from "./useFetchPlayers";

vi.mock("./useFetch", () => ({
  default: vi.fn().mockReturnValue({
    isLoading: false,
    data: { response: [squadMock] },
  }),
}));

describe("useFetchPlayers", () => {
  let renderHookResult: RenderHookResult<
    ReturnType<typeof useFetchPlayers>,
    any
  >;
  const teamIdMock = 9;

  beforeEach(() => {
    renderHookResult = renderHook(() => useFetchPlayers(teamIdMock));
  });

  it("should call useFetch with correct args", () => {
    expect(useFetch).toHaveBeenCalledWith(API_ENDPOINTS.squads, {
      team: teamIdMock,
    });
  });

  it("should return mapped players, isLoading and teamName", () => {
    const { id, photo, name, number, position } = squadMock.players[0];
    expect(renderHookResult.result.current).toStrictEqual({
      isLoading: false,
      teamName: squadMock.team.name,
      players: [
        {
          id,
          photo,
          name,
          number,
          position,
        },
      ],
    });
  });
});
