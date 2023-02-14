import { useCallback, useContext, useMemo } from "react";
import { MyOwnSquadContext } from "../contexts/MyOwnSquad.context";
import getObjectCountByArrProperty from "../helpers/getObjectCountByArrProperty.helper";
import getValidations from "../helpers/getValidations.helper";
import getValidationMessage from "../helpers/getValidationsMessage.helper";

const useMyOwnSquad = () => {
  const myOwnSquad = useContext(MyOwnSquadContext);

  const isMemberOnMySquad = useCallback(
    (teamMemberId: number) => {
      return Boolean(myOwnSquad.find(({ id }) => id === teamMemberId));
    },
    [myOwnSquad]
  );

  const membersPerTeamId = useMemo(
    () => getObjectCountByArrProperty(myOwnSquad, "teamId"),
    [myOwnSquad]
  );

  const membersPerPosition = useMemo(
    () => getObjectCountByArrProperty(myOwnSquad, "position"),
    [myOwnSquad]
  );

  const validations = useMemo(
    () => getValidations(myOwnSquad, membersPerPosition, membersPerTeamId),
    [membersPerPosition, membersPerTeamId, myOwnSquad]
  );

  const validationsMessage = useMemo(
    () => getValidationMessage(validations),
    [validations]
  );

  return {
    squad: myOwnSquad,
    isMemberOnMySquad,
    validations,
    validationsMessage,
  };
};

export default useMyOwnSquad;
