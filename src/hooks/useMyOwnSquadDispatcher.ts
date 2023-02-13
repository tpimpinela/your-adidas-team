import { useCallback, useContext } from "react";
import { MyOwnSquadDispatchContext } from "../contexts/MyOwnSquad.context";
import { TeamMember } from "../models/teamMember.model";
import { MyOwnSquadActionType } from "../reducers/myOwnSquad.reducer";

const useMyOwnSquadDispatcher = () => {
  const dispatch = useContext(MyOwnSquadDispatchContext);

  const addTeamMember = useCallback(
    (teamMember: TeamMember) => {
      dispatch({
        type: MyOwnSquadActionType.Add,
        payload: teamMember,
      });
    },
    [dispatch]
  );

  const deleteTeamMember = useCallback(
    (id: number) => {
      dispatch({
        type: MyOwnSquadActionType.Delete,
        payload: id,
      });
    },
    [dispatch]
  );

  return {
    addTeamMember,
    deleteTeamMember,
  };
};

export default useMyOwnSquadDispatcher;
