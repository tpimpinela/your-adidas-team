import { Outlet } from "react-router-dom";
import TeamSelection from "../TeamSelection";

const SquadCreator = () => {
  return (
    <>
      <TeamSelection />
      <Outlet />
    </>
  );
};

export default SquadCreator;
