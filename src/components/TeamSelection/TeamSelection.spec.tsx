import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import {
  beforeEach,
  describe,
  expect,
  it,
  Mocked,
  MockedFunction,
  vi,
} from "vitest";
import TeamSelection from ".";
import useFetchTeams from "../../hooks/useFetchTeams";
import { TeamMapped } from "../../models/teams.models";

vi.mock("react-router-dom", () => ({
  mockFn: vi.fn(),
  useNavigate() {
    return this.mockFn;
  },
}));
vi.mock("../../hooks/useFetchTeams", () => ({
  default: vi.fn(),
}));
vi.mock("../Team", () => ({
  default: ({ onTeamClick, team }: any) => (
    <h1 onClick={() => onTeamClick(team.id)} data-testid="team">
      Test
    </h1>
  ),
}));

describe("<TeamSelection />", () => {
  let renderResult: RenderResult;
  const useFetchTeamsMock = useFetchTeams as MockedFunction<any>;
  const teamsMock: TeamMapped[] = Array.from(
    { length: 5 },
    (element, index) => ({
      id: index,
      name: "test",
      logo: "test",
    })
  );

  beforeEach(() => {
    useFetchTeamsMock.mockReturnValue({
      isLoading: false,
      teams: teamsMock,
    });
    renderResult = render(<TeamSelection />);
  });

  it("the container should be opened at start", () => {
    expect(
      renderResult
        .getByTestId("container")
        .classList.toString()
        .includes("opened")
    ).toBeTruthy();
  });

  it("should close the container if toggle button is clicked", async () => {
    await userEvent.click(renderResult.getByRole("button"));
    expect(
      renderResult
        .getByTestId("container")
        .classList.toString()
        .includes("opened")
    ).toBeFalsy();
  });

  it("should render one team por team included on the useFetchTeams response", () => {
    const teams = renderResult.getAllByTestId("team");
    expect(teams.length).toBe(teamsMock.length);
  });

  it("should navigate to team page if a team is clicked", async () => {
    await userEvent.click(renderResult.getAllByTestId("team")[0]);
    expect(useNavigate() as MockedFunction<any>).toHaveBeenCalledWith(
      `/player-selection/0`
    );
  });

  it("should close the container if a team is clicked", async () => {
    await userEvent.click(renderResult.getAllByTestId("team")[0]);
    expect(
      renderResult
        .getByTestId("container")
        .classList.toString()
        .includes("opened")
    ).toBeFalsy();
  });
});
