import { beforeEach, describe, expect, vi, it, afterEach } from "vitest";
import daysToMiliseconds from "../helpers/daysToMiliseconds.helper";
import { FootballAPIResponse } from "../models/footballApiResponse.model";
import { HttpCache } from "../models/httpCache.model";
import { CACHE_VALIDITY_DAYS } from "../utils/config";
import {
  getCachedData,
  setCacheData,
  validUntilReviver,
} from "./cache.service";

describe("Cache service", () => {
  const initialLocalStorage = {
    cache: {
      test: {},
    },
  };
  const endpointMock = "new-endpoint";
  const dataMock = {} as FootballAPIResponse<any>;

  const getLocalStorageCache = () =>
    JSON.parse(localStorage.getItem("cache") ?? "{}", validUntilReviver);

  describe("setCacheData", () => {
    beforeEach(() => {
      localStorage.setItem("cache", JSON.stringify(initialLocalStorage.cache));
    });

    it("should add an endpoint cache to the localStorage", () => {
      setCacheData(endpointMock, dataMock);
      expect(getLocalStorageCache()).toEqual({
        ...initialLocalStorage.cache,
        [endpointMock]: expect.any(Object),
      });
    });

    it("shoud add validUntil property to cached data", () => {
      const currentDate = new Date();
      vi.setSystemTime(currentDate);
      setCacheData(endpointMock, dataMock);
      expect(
        getLocalStorageCache()[endpointMock]["validUntil"]?.getTime()
      ).toBe(
        new Date(
          currentDate.getTime() + daysToMiliseconds(CACHE_VALIDITY_DAYS)
        ).getTime()
      );
    });
  });

  describe("getCachedData", () => {
    it("should return undefined if the endpoint does not exist", () => {
      const data = getCachedData("fake-endpoint");
      expect(data).toBe(undefined);
    });

    describe("if endpoint cache is stale", () => {
      beforeEach(() => {
        localStorage.setItem(
          "cache",
          JSON.stringify({
            [endpointMock]: {
              validUntil: new Date(1990),
            },
          })
        );
      });

      it("should return undefined", () => {
        const data = getCachedData(endpointMock);
        expect(data).toBe(undefined);
      });

      it("should remove the endpoint from the cache", () => {
        getCachedData(endpointMock);
        expect(getLocalStorageCache()[endpointMock]).toBeFalsy();
      });
    });
  });

  afterEach(() => {
    localStorage.clear();
  });
});
