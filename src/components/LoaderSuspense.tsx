import { ReactNode, Suspense } from "react";
import Loader from "./Loader";

/**
 * Wrapper for lazy load components and show Loader while loading
 * the component.
 */
const LoaderSuspense = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export default LoaderSuspense;
