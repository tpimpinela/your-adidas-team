import { cleanup, render, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import TeamMember from ".";
import coachMock from "../../mocks/coach.mock";
import squadMock from "../../mocks/squads.mock";

describe("<TeamMember />", () => {
  let renderResult: RenderResult;
  const playerMock = squadMock.players[0];

  beforeEach(() => {
    renderResult = render(<TeamMember teamMember={playerMock} />);
  });

  it("should show teamMember name", () => {
    expect(renderResult.getByText(playerMock.name)).toBeTruthy();
  });

  it("should show teamMember image", () => {
    expect((renderResult.getByRole("img") as HTMLImageElement).src).toBe(
      playerMock.photo
    );
  });

  describe("if teamMember is a player", () => {
    beforeEach(() => {
      cleanup();
      renderResult = render(<TeamMember teamMember={playerMock} />);
    });

    it("should match the snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it("should show player position", () => {
      expect(renderResult.getByText(playerMock.position)).toBeTruthy();
    });
  });

  describe("if teamMember is a coach", () => {
    beforeEach(() => {
      cleanup();
      renderResult = render(<TeamMember teamMember={coachMock} />);
    });

    it("should match the snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it("shoud show coach literal", () => {
      expect(renderResult.getByText("COACH")).toBeTruthy();
    });
  });
});
