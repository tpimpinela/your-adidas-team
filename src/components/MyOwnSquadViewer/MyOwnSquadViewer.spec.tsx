import { render, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import MyOwnSquadViewer from ".";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";
import squadMock from "../../mocks/squads.mock";
import useMyOwnSquadDispatcher from "../../hooks/useMyOwnSquadDispatcher";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../../hooks/useMyOwnSquad", () => ({
  default: vi.fn(),
}));
vi.mock("../../hooks/useMyOwnSquadDispatcher", () => ({
  default: vi.fn(),
}));
vi.mock("../TeamMember", () => ({
  default: ({
    onTeamMemberClicked,
  }: {
    onTeamMemberClicked: (teamMember: any) => void;
  }) => (
    <button
      data-testid="team-member"
      onClick={() => onTeamMemberClicked({} as any)}
    >
      Click me
    </button>
  ),
}));

useMyOwnSquad;
describe("<MyOwnSquadViewer />", () => {
  let renderResult: RenderResult;
  let useNavigateMock: Mock<any, any>;
  const myOwnSquadDispatcherMock = useMyOwnSquadDispatcher as Mock<any, any>;
  const useMyOwnSquadMock = useMyOwnSquad as Mock<any, any>;
  let deleteTeamMemberMock: Mock<any, any>;

  beforeEach(() => {
    deleteTeamMemberMock = vi.fn();
    useMyOwnSquadMock.mockReturnValue({
      squad: [squadMock.players[0] as any],
    });
    myOwnSquadDispatcherMock.mockReturnValue({
      deleteTeamMember: deleteTeamMemberMock,
    });
    useNavigateMock = vi.fn();
    (useNavigate as Mock<any, any>).mockReturnValue(useNavigateMock);
    renderResult = render(<MyOwnSquadViewer />);
  });

  it("should match the snapshot", () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it("should navigate to players selection on button click", async () => {
    await userEvent.click(renderResult.getByTestId("button-component"));
    expect(useNavigateMock).toHaveBeenCalledWith("/player-selection");
  });

  it("should delete player if player is clicked", async () => {
    await userEvent.click(renderResult.getByTestId("team-member"));
    expect(deleteTeamMemberMock).toHaveBeenCalled();
  });
});
