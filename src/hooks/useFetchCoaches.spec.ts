import { renderHook, RenderHookResult } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import coachMock from "../mocks/coach.mock";
import { API_ENDPOINTS } from "../utils/config";
import useFetch from "./useFetch";
import useFetchCoaches from "./useFetchCoaches";

vi.mock("./useFetch", () => ({
  default: vi.fn().mockReturnValue({
    isLoading: false,
    data: { response: [coachMock] },
  }),
}));

describe("useFetchCoaches", () => {
  let renderHookResult: RenderHookResult<
    ReturnType<typeof useFetchCoaches>,
    any
  >;
  const teamIdMock = 9;

  beforeEach(() => {
    renderHookResult = renderHook(() => useFetchCoaches(teamIdMock));
  });

  it("should call useFetch with correct args", () => {
    expect(useFetch).toHaveBeenLastCalledWith(API_ENDPOINTS.coaches, {
      team: teamIdMock,
    });
  });

  it("should return mapped coaches and isLoading", () => {
    const { id, name, firstname, lastname, age, photo } = coachMock;
    expect(renderHookResult.result.current).toStrictEqual({
      isLoading: false,
      coaches: [{ id, name, age, photo, firstname, lastname }],
    });
  });
});
