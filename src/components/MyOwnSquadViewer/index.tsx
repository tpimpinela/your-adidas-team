import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";
import useMyOwnSquadDispatcher from "../../hooks/useMyOwnSquadDispatcher";
import { TeamMember as TeamMemberModel } from "../../models/teamMember.model";
import { getOwnSquadFromStorage } from "../../services/ownSquadStorage.service";
import Button from "../Button";
import TeamMember from "../TeamMember";
import styles from "./MyOwnSquadViewer.module.css";

const MyOwnSquadViewer = () => {
  const { squad } = useMyOwnSquad();
  const { deleteTeamMember } = useMyOwnSquadDispatcher();
  const navigate = useNavigate();

  const handleTeamMemberClick = useCallback(
    (teamMember: TeamMemberModel) => {
      deleteTeamMember(teamMember.id);
    },
    [deleteTeamMember]
  );

  const handleSelectPlayersClick = useCallback(() => {
    navigate("/player-selection");
  }, [navigate]);

  useEffect(() => {
    if ((getOwnSquadFromStorage()?.length ?? 0) > 0) return;
    navigate("/player-selection");
  }, []);

  return (
    <>
      <div className={styles.squad}>
        {squad.map((teamMember) => (
          <TeamMember
            teamMember={teamMember}
            onTeamMemberClicked={handleTeamMemberClick}
            key={teamMember.id}
            hideIncludedMark
            showDeleteMark
          />
        ))}
      </div>
      <div className={styles.actions}>
        <Button onClick={handleSelectPlayersClick}>Select players</Button>
      </div>
    </>
  );
};

export default MyOwnSquadViewer;
