import { render } from "@testing-library/react";
import { useContext } from "react";
import { describe, vi, it, expect, Mock } from "vitest";
import GlobalLoader from "./GlobalLoader";

vi.mock("react", async () => {
  const actual: object = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn(),
  };
});
vi.mock("../Loader", () => ({
  default: () => <h1 data-testid="loader">Loader</h1>,
}));

describe("<GlobalLoader />", () => {
  const useContextMock = useContext as Mock<any, any>;

  it("should return Loader if LoaderContext is true", () => {
    useContextMock.mockReturnValue(true);
    const { getByTestId } = render(<GlobalLoader />);
    expect(getByTestId("loader")).toBeTruthy();
  });

  it("should not return Loader if LoaderContext is false", () => {
    useContextMock.mockReturnValue(false);
    const { queryByTestId } = render(<GlobalLoader />);
    expect(queryByTestId("loader")).toBeFalsy();
  });
});
