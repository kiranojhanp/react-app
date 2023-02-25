import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Table from "../components/Table";

const Countries = () => {
  const loaderData = useLoaderData() as any;

  return (
    <>
      <Suspense fallback={<p>Taking longer than expected! Wait a while...</p>}>
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
