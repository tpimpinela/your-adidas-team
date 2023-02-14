import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { TeamMember } from "../models/teamMember.model";
import {
  MyOwnSquadAction,
  MyOwnSquadActionType,
  myOwnSquadReducer,
} from "../reducers/myOwnSquad.reducer";
import {
  getOwnSquadFromStorage,
  saveOwnSquadToStorage,
} from "../services/ownSquadStorage.service";

export const MyOwnSquadContext = createContext<TeamMember[]>([]);
export const MyOwnSquadDispatchContext = createContext<
  React.Dispatch<MyOwnSquadAction>
>(null as any);

export const MyOwnSquadContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [myOwnSquad, dispatch] = useReducer(myOwnSquadReducer, []);
  const [isSquadLoadedFromStorage, setIsSquadLoadedFromStorage] =
    useState(false);

  // Loading the saved squad from the localStorage
  useEffect(() => {
    const initialSquad = getOwnSquadFromStorage();
    setIsSquadLoadedFromStorage(true);
    if (!initialSquad) return;
    dispatch({
      type: MyOwnSquadActionType.Set,
      payload: initialSquad,
    });
  }, []);

  // Saving the squad to the localStorage
  useEffect(() => {
    if (!isSquadLoadedFromStorage) return;
    saveOwnSquadToStorage(myOwnSquad);
  }, [myOwnSquad, isSquadLoadedFromStorage]);

  return (
    <MyOwnSquadContext.Provider value={myOwnSquad}>
      <MyOwnSquadDispatchContext.Provider value={dispatch}>
        {children}
      </MyOwnSquadDispatchContext.Provider>
    </MyOwnSquadContext.Provider>
  );
};
