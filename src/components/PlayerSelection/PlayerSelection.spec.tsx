import { cleanup, render, RenderResult } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import PlayerSelection from ".";
import useFetchCoaches from "../../hooks/useFetchCoaches";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import coachMock from "../../mocks/coach.mock";
import squadMock from "../../mocks/squads.mock";
import { TeamMember } from "../../models/teamMember.model";
import userEvent from "@testing-library/user-event";
import useMyOwnSquadDispatcher from "../../hooks/useMyOwnSquadDispatcher";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));
vi.mock("../../hooks/useFetchCoaches", () => ({
  default: vi.fn(),
}));
vi.mock("../../hooks/useFetchPlayers", () => ({
  default: vi.fn(),
}));
vi.mock("../TeamMember", () => ({
  default: ({
    onTeamMemberClicked,
  }: {
    onTeamMemberClicked: (
      teamMember: TeamMember,
      isOnTheSquad: boolean
    ) => void;
  }) => (
    <>
      <h1 data-testid="team-member">TeamMember</h1>
      <button
        data-testid="click-true"
        onClick={() => {
          onTeamMemberClicked({} as any, true);
        }}
      >
        Click me
      </button>
      <button
        data-testid="click-false"
        onClick={() => {
          onTeamMemberClicked({} as any, false);
        }}
      >
        Click me
      </button>
    </>
  ),
}));
vi.mock("../../hooks/useMyOwnSquadDispatcher", () => ({
  mock1: vi.fn(),
  mock2: vi.fn(),
  default() {
    return {
      addTeamMember: this.mock1,
      deleteTeamMember: this.mock2,
    };
  },
}));

describe("<PlayerSelection />", () => {
  let renderResult: RenderResult;
  const teamIdMock = 9;
  const useParamsMock = useParams as Mock<any, any>;
  const useFetchCoachesMock = useFetchCoaches as Mock<any, any>;
  const useFetchPlayersMock = useFetchPlayers as Mock<any, any>;
  const addTeamMemberMock = useMyOwnSquadDispatcher().addTeamMember as Mock<
    any,
    any
  >;
  const deleteTeamMemberMock = useMyOwnSquadDispatcher()
    .deleteTeamMember as Mock<any, any>;

  beforeEach(() => {
    useParamsMock.mockReturnValue(teamIdMock);
    useFetchCoachesMock.mockReturnValue({
      coaches: [coachMock],
      isLoading: false,
    });
    useFetchPlayersMock.mockReturnValue({
      players: squadMock.players,
      isLoading: false,
      teamName: squadMock.team.name,
    });
    renderResult = render(<PlayerSelection />);
  });

  it("should match the snapshot", () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it("should show team name", () => {
    expect(renderResult.getByRole("heading", { level: 2 }).textContent).toBe(
      squadMock.team.name
    );
  });

  it("should show one TeamMember component per player and coach", () => {
    expect(renderResult.getAllByTestId("team-member").length).toBe(2);
  });

  describe("on team member clicked", () => {
    it("should add team member if is not already on the squad", async () => {
      await userEvent.click(renderResult.getAllByTestId("click-false")[0]);
      expect(addTeamMemberMock).toHaveBeenCalled();
    });

    it("should delete team member if is already on the squad", async () => {
      await userEvent.click(renderResult.getAllByTestId("click-true")[0]);
      expect(deleteTeamMemberMock).toHaveBeenCalled();
    });
  });
});
