import { TeamMapped } from "../../models/teams.models";
import styles from "./Team.module.css";

interface Props {
  team: TeamMapped;
  onTeamClick: (teamId: number) => void;
}

const Team = ({ team, onTeamClick }: Props) => {
  return (
    <div
      data-testid="team"
      onClick={() => onTeamClick(team.id)}
      className={styles.team}
    >
      <img
        className={styles.team__logo}
        src={team.logo}
        alt={`Logo of ${team.name} team`}
      />
      <span>{team.name}</span>
    </div>
  );
};

export default Team;
