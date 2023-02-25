import { Suspense } from "react";
import loadable from "@loadable/component";

interface SuspenseWrapperProps {
  path: string;
}

const SuspenseWrapper = ({ path }: SuspenseWrapperProps) => {
  const LazyComponent = loadable(() => import(`../${path}`));
  return <LazyComponent />;
};

export default SuspenseWrapper;
