import { useContext } from "react";
import { LoaderContext } from "../../contexts/Loader.context";
import Loader from "../Loader";

const GlobalLoader = () => {
  const showLoader = useContext(LoaderContext);

  if (!showLoader) return null;

  return <Loader />;
};

export default GlobalLoader;
