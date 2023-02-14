import { cleanup, render, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, Mocked, vi } from "vitest";
import TeamMember from ".";
import coachMock from "../../mocks/coach.mock";
import squadMock from "../../mocks/squads.mock";
import userEvent from "@testing-library/user-event";
import { PlayerMapped, PlayerPosition } from "../../models/squads.models";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";

vi.mock("../../hooks/useMyOwnSquad", () => ({
  default: vi.fn(),
}));

describe("<TeamMember />", () => {
  let renderResult: RenderResult;
  const playerMock = squadMock.players[0] as unknown as PlayerMapped;
  let onTeamMemberClickedMock: Mocked<any>;
  const useMyOwnSquadMock = useMyOwnSquad as Mock<any, any>;
  const isMemberOnMySquadMock = vi.fn();

  beforeEach(() => {
    useMyOwnSquadMock.mockReturnValue({
      isMemberOnMySquad: isMemberOnMySquadMock,
    });
    isMemberOnMySquadMock.mockReturnValue(false);
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
      renderResult = render(
        <TeamMember
          teamMember={{
            ...coachMock,
            teamId: 9,
            position: PlayerPosition.Coach,
          }}
        />
      );
    });

    it("should match the snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it("shoud show coach literal", () => {
      expect(renderResult.getByText("Coach")).toBeTruthy();
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

  describe("marks", () => {
    it("should show delete mark", () => {
      renderResult.rerender(
        <TeamMember teamMember={playerMock} showDeleteMark />
      );
      expect(renderResult.getByTestId("delete-mark")).toBeTruthy();
    });

    it("should not show the delete mark if prop is falsy", () => {
      renderResult.rerender(
        <TeamMember teamMember={playerMock} showDeleteMark={false} />
      );
      expect(renderResult.queryByTestId("delete-mark")).toBeFalsy();
    });
  });
});
