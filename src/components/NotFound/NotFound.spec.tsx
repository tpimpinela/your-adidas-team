import { render, RenderResult } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import NotFound from ".";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("<NotFound />", () => {
  let renderResult: RenderResult;
  let useNavigateMock: Mock<any, any>;

  beforeEach(() => {
    useNavigateMock = vi.fn();
    (useNavigate as Mock<any, any>).mockReturnValue(useNavigateMock);
    renderResult = render(<NotFound />);
  });

  it("should match the snapshot", () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it("should navigate to root route if button is clicked", async () => {
    await userEvent.click(renderResult.getByRole("button"));
    expect(useNavigateMock).toHaveBeenNthCalledWith(1, "/");
  });
});
