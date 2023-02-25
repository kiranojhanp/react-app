import { lazy, Suspense } from "react";
interface SuspenseWrapperProps {
  path: string;
}

const SuspenseWrapper = ({ path }: SuspenseWrapperProps) => {
  const LazyComponent = lazy(() => import(`../${path}.tsx`));

  return (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseWrapper;
