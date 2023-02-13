import { render, RenderResult } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import PlayerSelection from ".";
import useFetchCoaches from "../../hooks/useFetchCoaches";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import coachMock from "../../mocks/coach.mock";
import squadMock from "../../mocks/squads.mock";

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
  default: () => <h1 data-testid="team-member">TeamMember</h1>,
}));

describe("<PlayerSelection />", () => {
  let renderResult: RenderResult;
  const teamIdMock = 9;
  const useParamsMock = useParams as Mock<any, any>;
  const useFetchCoachesMock = useFetchCoaches as Mock<any, any>;
  const useFetchPlayersMock = useFetchPlayers as Mock<any, any>;

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
});
