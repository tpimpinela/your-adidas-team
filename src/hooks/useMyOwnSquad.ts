import { useContext } from "react";
import { MyOwnSquadContext } from "../contexts/MyOwnSquad.context";

const useMyOwnSquad = () => {
  const myOwnSquad = useContext(MyOwnSquadContext);

  return myOwnSquad;
};

export default useMyOwnSquad;
