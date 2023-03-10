import { useMemo } from "react";
import useMyOwnSquad from "../../hooks/useMyOwnSquad";
import { CoachMapped } from "../../models/coaches.models";
import { PlayerMapped } from "../../models/squads.models";
import { TeamMember } from "../../models/teamMember.model";
import styles from "./TeamMember.module.css";

interface Props {
  teamMember: PlayerMapped | CoachMapped;
  onTeamMemberClicked?: (teamMember: TeamMember, isOnTheSquad: boolean) => void;
  disabled?: boolean;
  hideIncludedMark?: boolean;
  showDeleteMark?: boolean;
}

const TeamMember = ({
  teamMember,
  onTeamMemberClicked,
  disabled,
  hideIncludedMark,
  showDeleteMark,
}: Props) => {
  const { isMemberOnMySquad: isMemberOnMySquadFn } = useMyOwnSquad();

  const isMemberOnMySquad = useMemo(
    () => isMemberOnMySquadFn(teamMember.id),
    [teamMember.id, isMemberOnMySquadFn]
  );

  return (
    <div
      onClick={() => onTeamMemberClicked?.(teamMember, isMemberOnMySquad)}
      className={`${styles["team-member"]} ${
        (!disabled && onTeamMemberClicked) || isMemberOnMySquad
          ? `${styles["team-member--clicable"]}`
          : `${styles["team-member--disabled"]}`
      }`}
      data-testid="team-member"
    >
      <img
        className={styles["team-member__image"]}
        src={teamMember.photo}
        alt={`Photo of ${teamMember.name}`}
      />
      <div className={styles["team-member__info"]}>
        <span className={styles.name}>{teamMember.name}</span>
        <span className={styles.position}>{teamMember.position}</span>
      </div>
      {!hideIncludedMark && isMemberOnMySquad && (
        <span
          data-testid="included-mark"
          className={`${styles.mark} ${styles["mark--included"]}`}
        >
          ✓
        </span>
      )}
      {showDeleteMark && (
        <span
          data-testid="delete-mark"
          className={`${styles.mark} ${styles["mark--delete"]}`}
        >
          X
        </span>
      )}
    </div>
  );
};

export default TeamMember;
