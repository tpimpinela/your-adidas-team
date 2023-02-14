import { render, RenderResult } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  LoaderContext,
  LoaderContextProvider,
  LoaderDispatchContext,
} from "./Loader.context";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
  const loaderContext = useContext(LoaderContext);
  const loaderDispatcherContext = useContext(LoaderDispatchContext);

  return (
    <>
      <span data-testid="context-value">
        {loaderContext ? "true" : "false"}
      </span>
      <button
        data-testid="change-context"
        onClick={() => loaderDispatcherContext(!loaderContext)}
      ></button>
    </>
  );
};

describe("<LoaderContextProvider />", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <LoaderContextProvider>
        <TestComponent />
      </LoaderContextProvider>
    );
  });

  it("should render children", () => {
    expect(renderResult.getByTestId("context-value")).toBeTruthy();
  });

  it("should allow children to access to both context", () => {
    expect(renderResult.getByText("false")).toBeTruthy();
  });

  it("should allow children to change the context", async () => {
    await userEvent.click(renderResult.getByTestId("change-context"));
    expect(renderResult.getByText("true")).toBeTruthy();
  });
});
