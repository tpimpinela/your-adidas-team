import { useMemo } from "react";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";
import { CoachMapped } from "../../models/coaches.models";
import { PlayerMapped } from "../../models/squads.models";
import { TeamMember } from "../../models/teamMember.model";
import styles from "./TeamMember.module.css";

interface Props {
  teamMember: PlayerMapped | CoachMapped;
  onTeamMemberClicked?: (teamMember: TeamMember, isOnTheSquad: boolean) => void;
}

const TeamMember = ({ teamMember, onTeamMemberClicked }: Props) => {
  const { isMemberOnMySquad: isMemberOnMySquadFn } = useMyOwnSquad();

  const isMemberOnMySquad = useMemo(
    () => isMemberOnMySquadFn(teamMember.id),
    [teamMember.id, isMemberOnMySquadFn]
  );

  return (
    <div
      onClick={() => onTeamMemberClicked?.(teamMember, isMemberOnMySquad)}
      className={`${styles["team-member"]}`}
      data-testid="team-member"
    >
      <img
        className={styles["team-member__image"]}
        src={teamMember.photo}
        alt={`Photo of ${teamMember.name}`}
      />
      <div className={styles["team-member__info"]}>
        <span className={styles.name}>{teamMember.name}</span>
        <span className={styles.position}>
          {"position" in teamMember ? teamMember.position : "COACH"}
        </span>
      </div>
      {isMemberOnMySquad && <span className={styles["included-mark"]}>✓</span>}
    </div>
  );
};

export default TeamMember;
