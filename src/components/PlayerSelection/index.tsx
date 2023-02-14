import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchCoaches from "../../hooks/useFetchCoaches";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";
import useMyOwnSquadDispatcher from "../../hooks/useMyOwnSquadDispatcher";
import { TeamMember as TeamMemberModel } from "../../models/teamMember.model";
import { MAX_PLAYERS_PER_TEAM } from "../../utils/config";
import Button from "../Button";
import TeamMember from "../TeamMember";
import styles from "./PlayerSelection.module.css";

const PlayerSelection = () => {
  const { teamId } = useParams() as { teamId: string };
  const { players, teamName } = useFetchPlayers(parseInt(teamId));
  const { coaches } = useFetchCoaches(parseInt(teamId));
  const { addTeamMember, deleteTeamMember } = useMyOwnSquadDispatcher();
  const {
    validations: { disabledTeamIds, maxPlayers },
  } = useMyOwnSquad();
  const navigate = useNavigate();

  const handleTeamMemberClick = useCallback(
    (teamMember: TeamMemberModel, isOnTheSquad: boolean) => {
      if (isOnTheSquad) {
        deleteTeamMember(teamMember.id);
      } else if (!isTeamIdDisabled) {
        addTeamMember(teamMember);
      }
    },
    [addTeamMember]
  );

  const handleSeeYourTeam = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const isTeamIdDisabled = useMemo(
    () => disabledTeamIds?.includes(parseInt(teamId)),
    [disabledTeamIds, teamId]
  );

  return (
    <>
      <div className={styles.actions}>
        <Button onClick={handleSeeYourTeam}>See your team</Button>
      </div>
      <div className={styles.headings}>
        <h2 className={styles["headings__name"]}>{teamName}</h2>
        {(isTeamIdDisabled || maxPlayers) && (
          <h3
            data-testid="warning-header"
            className={styles["headings__warning"]}
          >
            {maxPlayers
              ? `You have reached the maximum number of players on your team.`
              : `You can't add more players from this team. Please, deselect one
                or check another team.`}
          </h3>
        )}
      </div>
      <div className={styles["player-selection-container"]}>
        {[...(players ?? []), ...(coaches ?? [])]?.map((teamMember) => (
          <TeamMember
            onTeamMemberClicked={handleTeamMemberClick}
            teamMember={teamMember}
            disabled={isTeamIdDisabled || Boolean(maxPlayers)}
            key={teamMember.id}
          />
        ))}
      </div>
    </>
  );
};

export default PlayerSelection;
