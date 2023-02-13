import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetchCoaches from "../../hooks/useFetchCoaches";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import useMyOwnSquadDispatcher from "../../hooks/useMyOwnSquadDispatcher";
import { TeamMember as TeamMemberModel } from "../../models/teamMember.model";
import TeamMember from "../TeamMember";
import styles from "./PlayerSelection.module.css";

const PlayerSelection = () => {
  const { teamId } = useParams() as { teamId: string };
  const { players, teamName } = useFetchPlayers(parseInt(teamId));
  const { coaches } = useFetchCoaches(parseInt(teamId));
  const { addTeamMember, deleteTeamMember } = useMyOwnSquadDispatcher();

  const handleTeamMemberClick = useCallback(
    (teamMember: TeamMemberModel, isOnTheSquad: boolean) => {
      if (isOnTheSquad) {
        deleteTeamMember(teamMember.id);
      } else {
        addTeamMember(teamMember);
      }
    },
    [addTeamMember]
  );

  return (
    <>
      <h2 className={styles["team-name"]}>{teamName}</h2>
      <div className={styles["player-selection-container"]}>
        {[...(players ?? []), ...(coaches ?? [])]?.map((teamMember) => (
          <TeamMember
            onTeamMemberClicked={handleTeamMemberClick}
            teamMember={teamMember}
            key={teamMember.id}
          />
        ))}
      </div>
    </>
  );
};

export default PlayerSelection;
