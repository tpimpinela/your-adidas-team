import { ReactNode } from "react";
import { LoaderContextProvider } from "./Loader.context";
import { MyOwnSquadContextProvider } from "./MyOwnSquad.context";

const ContextProvider = ({ children }: { children: ReactNode }) => (
  <LoaderContextProvider>
    <MyOwnSquadContextProvider>{children}</MyOwnSquadContextProvider>
  </LoaderContextProvider>
);

export default ContextProvider;
