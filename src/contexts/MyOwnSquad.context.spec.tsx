import {
  render,
  renderHook,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { useContext, useEffect, useReducer } from "react";
import { beforeEach, describe, expect, it, Mock, Mocked, vi } from "vitest";
import useMyOwnSquad from "../hooks/useMyOwnSquad";
import squadMock from "../mocks/squads.mock";
import {
  MyOwnSquadActionType,
  myOwnSquadReducer,
} from "../reducers/myOwnSquad.reducer";
import {
  getOwnSquadFromStorage,
  saveOwnSquadToStorage,
} from "../services/ownSquadStorage.service";
import {
  MyOwnSquadContext,
  MyOwnSquadContextProvider,
  MyOwnSquadDispatchContext,
} from "./MyOwnSquad.context";

vi.mock("../services/ownSquadStorage.service", () => ({
  getOwnSquadFromStorage: vi.fn(),
  saveOwnSquadToStorage: vi.fn(),
}));
vi.mock("../reducers/myOwnSquad.reducer", async () => {
  const actual: any = await vi.importActual("../reducers/myOwnSquad.reducer");
  return {
    ...actual,
    myOwnSquadReducer: vi.fn().mockImplementation(actual.myOwnSquadReducer),
  };
});

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
  const getOwnSquadFromStorageMock = getOwnSquadFromStorage as Mock<any>;
  const saveOwnSquadToStorageMock = saveOwnSquadToStorage as Mock<any>;
  const reducerMock = myOwnSquadReducer as Mock<any>;

  beforeEach(() => {
    getOwnSquadFromStorageMock.mockReturnValue([squadMock.players[0]]);
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

  it("should load the saved squad from storage and set it to the context", async () => {
    expect(getOwnSquadFromStorageMock).toHaveBeenCalled();
    expect(reducerMock).toHaveBeenCalledWith(expect.any(Array), {
      type: MyOwnSquadActionType.Set,
      payload: [squadMock.players[0]],
    });
  });

  it("should save the squad to the localStorage", () => {
    expect(saveOwnSquadToStorageMock).toHaveBeenCalled();
  });
});
