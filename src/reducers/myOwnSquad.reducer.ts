import { TeamMember } from "../models/teamMember.model";

export interface MyOwnSquadAction {
  type: MyOwnSquadActionType;
  payload: any;
}

export enum MyOwnSquadActionType {
  Add,
  Delete,
  Set,
}

export const myOwnSquadReducer = (
  myOwnSquad: TeamMember[],
  action: MyOwnSquadAction
) => {
  switch (action.type) {
    case MyOwnSquadActionType.Add:
      return [...myOwnSquad, action.payload];
    case MyOwnSquadActionType.Delete:
      return [...myOwnSquad].filter((member) => member.id !== action.payload);
    case MyOwnSquadActionType.Set:
      return [...action.payload];
  }
};
