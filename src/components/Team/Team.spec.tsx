import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, Mock, vi, it } from "vitest";
import Team from ".";
import teamMappedMock from "../../mocks/teamMapped.mock";

describe("<Team />", () => {
  let renderResult: RenderResult;
  let onTeamClickMock: Mock<any>;

  beforeEach(() => {
    onTeamClickMock = vi.fn();
    renderResult = render(
      <Team team={teamMappedMock} onTeamClick={onTeamClickMock} />
    );
  });

  it("should match the snapshopt", () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it("should call onTeamClick when the team is clicked", async () => {
    await userEvent.click(renderResult.getByTestId("team"));
    expect(onTeamClickMock).toHaveBeenNthCalledWith(1, teamMappedMock.id);
  });
});
