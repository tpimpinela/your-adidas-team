import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchTeams from "../../hooks/useFetchTeams";
import Team from "../Team";
import styles from "./TeamSelection.module.css";

const TeamSelection = () => {
  const [opened, setOpened] = useState(true);
  const { teams, isLoading } = useFetchTeams();
  const navigate = useNavigate();

  const handleTeamClick = (teamId: number) => {
    navigate(`/player-selection/${teamId}`);
    setOpened(false);
  };

  return (
    <div
      className={`${styles["team-list-container"]} ${
        opened && styles["team-list-container--opened"]
      }`}
      data-testid="container"
    >
      <aside className={styles["team-list"]}>
        {teams?.map((team) => (
          <Team key={team.id} team={team} onTeamClick={handleTeamClick} />
        ))}
      </aside>
      <button
        onClick={() => setOpened((opened) => !opened)}
        className={styles["team-list__toggle"]}
      >
        {opened ? ">" : "<"}
      </button>
    </div>
  );
};

export default TeamSelection;
