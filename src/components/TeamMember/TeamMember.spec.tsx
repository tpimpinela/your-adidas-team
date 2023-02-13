import { cleanup, render, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import TeamMember from ".";
import coachMock from "../../mocks/coach.mock";
import squadMock from "../../mocks/squads.mock";
import userEvent from "@testing-library/user-event";

describe("<TeamMember />", () => {
  let renderResult: RenderResult;
  const playerMock = squadMock.players[0];
  let onTeamMemberClickedMock: Mocked<any>;

  beforeEach(() => {
    onTeamMemberClickedMock = vi.fn();
    renderResult = render(
      <TeamMember
        teamMember={playerMock}
        onTeamMemberClicked={onTeamMemberClickedMock}
      />
    );
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

  it("should call onTeamMemberClicked prop function if the member is clicked", async () => {
    await userEvent.click(renderResult.getByTestId("team-member"));
    expect(onTeamMemberClickedMock).toHaveBeenNthCalledWith(
      1,
      playerMock,
      false
    );
  });
});
