import {
  fireEvent,
  renderHook,
  RenderHookResult,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  SpyInstance,
  vi,
} from "vitest";
import useShowScrollIndicator from "./useShowScrollIndicator";

describe("useShowScrollIndicator", () => {
  let renderHookResult: RenderHookResult<
    ReturnType<typeof useShowScrollIndicator>,
    any
  >;
  let scrollHeightMock: SpyInstance<any, any>;
  let clientHeightMock: SpyInstance<any, any>;
  let scrollTopMock: SpyInstance<any, any>;

  const render = (scrollPercentage?: number) =>
    (renderHookResult = renderHook(() =>
      useShowScrollIndicator(scrollPercentage)
    ));

  beforeEach(() => {
    scrollHeightMock = vi.spyOn(
      document?.documentElement,
      "scrollHeight",
      "get"
    );
    clientHeightMock = vi.spyOn(
      document?.documentElement,
      "clientHeight",
      "get"
    );
    scrollTopMock = vi.spyOn(document?.documentElement, "scrollTop", "get");
  });

  it("should not show scroll indicator if scroll is on top", () => {
    scrollHeightMock.mockReturnValue(1000);
    clientHeightMock.mockReturnValue(1000);
    scrollTopMock.mockReturnValue(0);
    render(15);
    expect(renderHookResult.result.current).toBeFalsy();
  });

  it("should not show scroll indicator if scroll is less than scrollPercentage", () => {
    scrollHeightMock.mockReturnValue(6000);
    clientHeightMock.mockReturnValue(100);
    scrollTopMock.mockReturnValue(20);
    render(90);
    expect(renderHookResult.result.current).toBeFalsy();
  });

  it("should show scroll indicator if scroll is greater or equal than scrollPercentage", async () => {
    scrollHeightMock.mockReturnValue(2000);
    clientHeightMock.mockReturnValue(100);
    scrollTopMock.mockReturnValue(1800);
    render();
    fireEvent.scroll(window);
    await waitFor(() => expect(renderHookResult.result.current).toBeTruthy());
  });
});
