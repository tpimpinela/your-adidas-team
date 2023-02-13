import { beforeEach, describe, vi, it, expect } from "vitest";
import squadMock from "../mocks/squads.mock";
import {
  getOwnSquadFromStorage,
  ownSquadLocalStorageKey,
  saveOwnSquadToStorage,
} from "./ownSquadStorage.service";

describe("ownSquadStorageService", () => {
  let localStorageMock: { [key: string]: any };
  const savedSquadMock = [squadMock.players[0]];

  beforeEach(() => {
    localStorageMock = {};
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(
      (key: string, value: any) => {
        localStorageMock[key] = JSON.parse(value);
      }
    );
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key: string) =>
      JSON.stringify(localStorageMock[key])
    );
  });

  it("should save own squad to localStorage", () => {
    saveOwnSquadToStorage(savedSquadMock);
    expect(localStorageMock[ownSquadLocalStorageKey]).toStrictEqual(
      savedSquadMock
    );
  });

  it("should get own squad from localStorage", () => {
    localStorageMock[ownSquadLocalStorageKey] = savedSquadMock;
    expect(getOwnSquadFromStorage()).toStrictEqual(savedSquadMock);
  });
});
