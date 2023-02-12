import { renderHook, RenderHookResult, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  SpyInstance,
  vi,
} from "vitest";
import { getCachedData, setCacheData } from "../services/cache.service";
import { API_KEY } from "../utils/config";
import useFetch from "./useFetch";

vi.mock("../services/cache.service", () => ({
  getCachedData: vi.fn(),
  setCacheData: vi.fn(),
}));

describe("useFetch", () => {
  let renderHookResult: RenderHookResult<ReturnType<typeof useFetch>, any>;
  const endpointMock = "http://fake-endpoint.com";
  const responseMock = { data: [1, 2, 3] };
  let fetchMock: SpyInstance<any, any>;
  const fetchJsonMock = vi.fn().mockReturnValue(Promise.resolve(responseMock));
  const getCachedDataMock = getCachedData as Mock<any, any>;
  const setCacheDataMock = setCacheData as Mock<any, any>;

  beforeEach(() => {
    fetchMock = vi.spyOn(globalThis, "fetch").mockReturnValue(
      Promise.resolve({
        json: fetchJsonMock,
      } as unknown as Response)
    );
    renderHookResult = renderHook(() => useFetch(endpointMock));
  });

  it("should return initial result", () => {
    expect(renderHookResult.result.current).toStrictEqual({
      data: undefined,
      isLoading: true,
    });
  });

  it("should return isLoading to false after getting the data", async () => {
    waitFor(() =>
      expect(renderHookResult.result.current.isLoading).toBe(false)
    );
  });

  describe("if the endpoint is not in the cache", () => {
    it("should fetch the endpoint and return the data", async () => {
      waitFor(() =>
        expect(renderHookResult.result.current.data).toStrictEqual(
          responseMock.data
        )
      );
    });

    it("should add authentication header", () => {
      expect(fetchMock).toHaveBeenCalledWith(endpointMock, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
        },
      });
    });

    it("should save the result on the cache", () => {
      expect(setCacheDataMock).toHaveBeenCalledWith(endpointMock, responseMock);
    });
  });

  describe("if the endpoint is in the cache", () => {
    beforeEach(() => {
      getCachedDataMock.mockReturnValue(responseMock);
      fetchJsonMock.mockClear();
      renderHookResult.rerender();
    });

    it("should not fetch the endpoint", () => {
      expect(fetchJsonMock).not.toHaveBeenCalled();
    });

    it("should return data from the cache", async () => {
      await waitFor(() =>
        expect(renderHookResult.result.current.data).toStrictEqual(responseMock)
      );
    });
  });
});
