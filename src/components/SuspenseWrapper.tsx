import { lazy, Suspense } from "react";
import Loading from './Loading';
interface SuspenseWrapperProps {
  path: string;
}

const SuspenseWrapper = ({ path }: SuspenseWrapperProps) => {
  const LazyComponent = lazy(() => import(`../${path}.tsx`));

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseWrapper;
