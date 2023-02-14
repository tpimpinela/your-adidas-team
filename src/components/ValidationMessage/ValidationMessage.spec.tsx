import { render, RenderResult } from "@testing-library/react";
import { it, beforeEach, describe, Mock, vi, expect } from "vitest";
import ValidationMessage from ".";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";

vi.mock("../../hooks/useMyOwnSquad", () => ({
  default: vi.fn(),
}));

describe("<ValidationMessage />", () => {
  let renderResult: RenderResult;
  const useMyOwnSquadMock = useMyOwnSquad as Mock<any, any>;

  describe("there are validation errors", () => {
    const validationMessageMock = "test";

    beforeEach(() => {
      useMyOwnSquadMock.mockReturnValue({
        validationsMessage: validationMessageMock,
      });
      renderResult = render(<ValidationMessage />);
    });

    it("should match the snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it("should show validation message", () => {
      expect(renderResult.getByTestId("validation-message")).toBeTruthy();
      expect(renderResult.getByTestId("validation-message").textContent).toBe(
        validationMessageMock
      );
    });

    it("should show the correct header", () => {
      expect(
        renderResult
          .getByRole("heading", { level: 3 })
          .textContent?.toLowerCase()
      ).toBe("your team will be ready when:");
    });
  });

  describe("there are no validation errors", () => {
    beforeEach(() => {
      useMyOwnSquadMock.mockReturnValue({
        validationsMessage: undefined,
      });
      renderResult = render(<ValidationMessage />);
    });

    it("should match the snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it("should not show validation message", () => {
      expect(renderResult.queryByTestId("validation-message")).toBeFalsy();
    });

    it("should show the correct header", () => {
      expect(
        renderResult
          .getByRole("heading", { level: 3 })
          .textContent?.toLowerCase()
      ).toBe("your team is ready");
    });
  });
});
