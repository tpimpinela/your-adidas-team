import { render, RenderResult, waitFor } from "@testing-library/react";
import { beforeEach, describe, Mock, vi, it, expect } from "vitest";
import ScrollIndicator from ".";
import useShowScrollIndicator from "../../hooks/useShowScrollIndicator";

vi.mock("../../hooks/useShowScrollIndicator", () => ({
  default: vi.fn(),
}));

describe("<ScrollIndicator />", () => {
  let renderResult: RenderResult;
  const useShowScrollIndicatorMock = useShowScrollIndicator as Mock<any, any>;

  beforeEach(() => {
    renderResult = render(<ScrollIndicator />);
  });

  it("should match the snapshot", () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it("should hide indicator", async () => {
    useShowScrollIndicatorMock.mockReturnValue(false);
    renderResult.rerender(<ScrollIndicator />);
    await waitFor(() =>
      expect(
        renderResult
          .getByTestId("scroll-indicator")
          .classList.toString()
          .includes("shown")
      ).toBeFalsy()
    );
  });

  it("should show indicator", async () => {
    useShowScrollIndicatorMock.mockReturnValue(true);
    renderResult.rerender(<ScrollIndicator />);
    await waitFor(() =>
      expect(
        renderResult
          .getByTestId("scroll-indicator")
          .classList.toString()
          .includes("shown")
      ).toBeTruthy()
    );
  });
});
