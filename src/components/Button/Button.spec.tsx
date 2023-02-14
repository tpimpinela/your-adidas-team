import { render, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, Mock, vi, it } from "vitest";
import Button from ".";
import userEvent from "@testing-library/user-event";

describe("<Button />", () => {
  let renderResult: RenderResult;
  let onClickMock: Mock<any, any>;
  const childrenText = "Children";

  beforeEach(() => {
    onClickMock = vi.fn();
    renderResult = render(
      <Button onClick={onClickMock}>{childrenText}</Button>
    );
  });

  it("should render children", () => {
    expect(renderResult.getByText(childrenText)).toBeTruthy();
  });

  it("should call onClick prop if button is clicked", async () => {
    await userEvent.click(renderResult.getByTestId("button-component"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
