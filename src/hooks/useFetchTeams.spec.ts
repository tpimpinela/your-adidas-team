import { renderHook, RenderHookResult } from "@testing-library/react";
import { beforeEach, describe, expect, vi, it } from "vitest";
import teamInfoMock from "../mocks/teamInfo.mock";
import { API_ENDPOINTS, LEAGUE, SEASON } from "../utils/config";
import useFetch from "./useFetch";
import useFetchTeams from "./useFetchTeams";

vi.mock("./useFetch", () => ({
  default: vi.fn().mockReturnValue({
    isLoading: false,
    data: { response: [teamInfoMock] },
  }),
}));

describe("useFetchTeams", () => {
  let renderHookResult: RenderHookResult<ReturnType<typeof useFetchTeams>, any>;

  beforeEach(() => {
    renderHookResult = renderHook(useFetchTeams);
  });

  it("should call useFetch with correct args", () => {
    expect(useFetch).toHaveBeenCalledWith(API_ENDPOINTS.teams, {
      league: LEAGUE,
      season: SEASON,
    });
  });

  it("should return mapped teams and isLoading", () => {
    expect(renderHookResult.result.current).toStrictEqual({
      isLoading: false,
      teams: [
        {
          id: teamInfoMock.team.id,
          name: teamInfoMock.team.name,
          logo: teamInfoMock.team.logo,
        },
      ],
    });
  });
});
