import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Loading from '../components/Loading';

import Table from "../components/Table";

const Countries = () => {
  const loaderData = useLoaderData() as any;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await
          resolve={loaderData.countriesName}
          errorElement={<div>Oops!</div>}
        >
          <Table />
        </Await>
      </Suspense>
    </>
  );
};

export default Countries;
