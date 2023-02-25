import { defer } from "react-router-dom";
import queryClient from "../rquery/queryClient";
import { countriesQuery, countryDetailsQuery } from "../rquery/countries";

export async function countriesLoader() {
  return defer({
    countriesName: queryClient.fetchQuery(countriesQuery),
  });
}

export async function countryDetailLoader({ params }: any) {
  return defer({
    universities: queryClient.fetchQuery(countryDetailsQuery(params.id)),
  });
}
