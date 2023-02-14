import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loader from ".";

describe("<Loader />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
