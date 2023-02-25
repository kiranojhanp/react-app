import { defer } from "react-router-dom";
import queryClient from "../../rquery/queryClient";
import { countriesQuery } from "../queries/countries";

export async function loader() {
  return defer({
    countriesName: queryClient.fetchQuery(countriesQuery),
  });
}
