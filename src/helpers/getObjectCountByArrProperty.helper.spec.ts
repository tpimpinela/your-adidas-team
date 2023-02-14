import { describe, expect, it } from "vitest";
import getObjectCountByArrProperty from "./getObjectCountByArrProperty.helper";

describe("getObjectByArrProperty helper", () => {
  it("should return the correct object", () => {
    const valuesMock = [
      {
        test: 1,
      },
      {
        test: 2,
      },
      {
        test: 2,
      },
    ];
    const result = getObjectCountByArrProperty(valuesMock, "test");
    expect(result).toStrictEqual({
      1: 1,
      2: 2,
    });
  });
});
