import { lazy, Suspense } from 'react';

const GoogleMapComponent = lazy(() => import('@/components/map/GoogleMapComponent'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <GoogleMapComponent />
      </Suspense>
    </div>
  );
};

export default HomePage;