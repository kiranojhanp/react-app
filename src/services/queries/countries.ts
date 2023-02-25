import { getCountries } from "../countries";

const countriesQuery = {
  queryKey: ["countries"],
  queryFn: async () => await getCountries("asia"),
  options: {
    staleTime: 10000,
  },
};

export { countriesQuery };
