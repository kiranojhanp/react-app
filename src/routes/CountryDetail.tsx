import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";
import UniversityList from "../components/UniversityList";

const CountryDetail = () => {
  const loaderData = useLoaderData() as any;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await
          resolve={loaderData.countriesName}
          errorElement={<div>Oops!</div>}
        >
          <UniversityList />
        </Await>
      </Suspense>
    </>
  );
};

export default CountryDetail;
