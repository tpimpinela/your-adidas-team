import React, { createContext, ReactNode, useReducer } from "react";
import { TeamMember } from "../models/teamMember.model";
import {
  MyOwnSquadAction,
  myOwnSquadReducer,
} from "../reducers/myOwnSquad.reducer";

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

  return (
    <MyOwnSquadContext.Provider value={myOwnSquad}>
      <MyOwnSquadDispatchContext.Provider value={dispatch}>
        {children}
      </MyOwnSquadDispatchContext.Provider>
    </MyOwnSquadContext.Provider>
  );
};
