import { describe, expect, it } from "vitest";
import daysToMiliseconds from "./daysToMiliseconds.helper";

describe("daysToMiliseconds", () => {
  it("should convert days to miliseconds", () => {
    const days = 7;
    const miliseconds = days * 24 * 60 * 60 * 1000;
    expect(daysToMiliseconds(days)).toBe(miliseconds);
  });
});
