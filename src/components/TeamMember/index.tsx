import { CoachMapped } from "../../models/coaches.models";
import { PlayerMapped } from "../../models/squads.models";
import styles from "./TeamMember.module.css";

interface Props {
  teamMember: PlayerMapped | CoachMapped;
}

const TeamMember = ({ teamMember }: Props) => {
  return (
    <div className={styles["team-member"]}>
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
    </div>
  );
};

export default TeamMember;
