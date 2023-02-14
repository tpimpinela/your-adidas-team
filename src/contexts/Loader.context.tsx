import { createContext, ReactNode, useState } from "react";

export const LoaderContext = createContext(false);
export const LoaderDispatchContext = createContext<(value: boolean) => void>(
  null as any
);

export const LoaderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <LoaderContext.Provider value={showLoader}>
      <LoaderDispatchContext.Provider value={setShowLoader}>
        {children}
      </LoaderDispatchContext.Provider>
    </LoaderContext.Provider>
  );
};
