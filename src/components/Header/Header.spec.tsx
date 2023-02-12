import { beforeEach, describe, expect, it } from "vitest";
import { render, RenderResult } from "@testing-library/react";
import Header from ".";

describe("<Header />", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Header />);
  });

  it("should match the snapshot", () => {
    expect(renderResult.container).toMatchSnapshot();
  });
});
