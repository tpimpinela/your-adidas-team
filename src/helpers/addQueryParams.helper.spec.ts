import { describe, expect, it } from "vitest";
import addQueryParams from "./addQueryParams.helper";

describe("addQueryParams", () => {
  const urlMock = "http://fake-url.com";
  const queryParamsMock = {
    search: "Messi",
  };

  it("should return same url if query params are not provided", () => {
    const result = addQueryParams(urlMock);
    expect(result).toBe(urlMock);
  });

  it("should return url with query params", () => {
    const result = addQueryParams(urlMock, queryParamsMock);
    expect(result).toBe(`${urlMock}?search=Messi`);
  });
});
