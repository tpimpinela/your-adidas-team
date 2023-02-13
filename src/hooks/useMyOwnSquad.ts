import { useCallback, useContext } from "react";
import { MyOwnSquadContext } from "../contexts/MyOwnSquad.context";

const useMyOwnSquad = () => {
  const myOwnSquad = useContext(MyOwnSquadContext);

  const isMemberOnMySquad = useCallback(
    (teamMemberId: number) => {
      return Boolean(myOwnSquad.find(({ id }) => id === teamMemberId));
    },
    [myOwnSquad]
  );

  return {
    squad: myOwnSquad,
    isMemberOnMySquad,
  };
};

export default useMyOwnSquad;
