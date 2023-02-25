import { Suspense } from "react";
import loadable from '@loadable/component';

interface SuspenseWrapperProps {
  path: string;
}

const SuspenseWrapper = ({ path }: SuspenseWrapperProps) => {
  const LazyComponent = loadable(() => import(`../${path}`));

  return (
    <Suspense fallback={<span>Lazily loading component...</span>}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseWrapper;
