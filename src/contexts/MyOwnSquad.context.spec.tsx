import { render, RenderResult, waitFor } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import squadMock from "../mocks/squads.mock";
import { MyOwnSquadActionType } from "../reducers/myOwnSquad.reducer";
import {
  MyOwnSquadContext,
  MyOwnSquadContextProvider,
  MyOwnSquadDispatchContext,
} from "./MyOwnSquad.context";

const TestComponent = () => {
  const dispatch = useContext(MyOwnSquadDispatchContext);
  const myOwnSquad = useContext(MyOwnSquadContext);

  useEffect(() => {
    dispatch({
      type: MyOwnSquadActionType.Add,
      payload: squadMock.players[0],
    });
  }, []);

  return <h1>{myOwnSquad?.[0]?.name}</h1>;
};

describe("<MyOwnSquadContextProvider />", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <MyOwnSquadContextProvider>
        <TestComponent />
      </MyOwnSquadContextProvider>
    );
  });

  it("should render children", async () => {
    await waitFor(() => expect(renderResult.getByRole("heading")).toBeTruthy());
  });

  it("should allow children to access both contexts", async () => {
    await waitFor(() =>
      expect(renderResult.getByText(squadMock.players[0].name)).toBeTruthy()
    );
  });
});
