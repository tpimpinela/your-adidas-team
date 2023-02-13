import { useParams } from "react-router-dom";
import useFetchCoaches from "../../hooks/useFetchCoaches";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import TeamMember from "../TeamMember";
import styles from "./PlayerSelection.module.css";

const PlayerSelection = () => {
  const { teamId } = useParams() as { teamId: string };
  const { players, teamName } = useFetchPlayers(parseInt(teamId));
  const { coaches } = useFetchCoaches(parseInt(teamId));

  return (
    <>
      <h2 className={styles["team-name"]}>{teamName}</h2>
      <div className={styles["player-selection-container"]}>
        {[...(players ?? []), ...(coaches ?? [])]?.map((teamMember) => (
          <TeamMember teamMember={teamMember} key={teamMember.id} />
        ))}
      </div>
    </>
  );
};

export default PlayerSelection;
