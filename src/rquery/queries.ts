import { getCountries, getUniversitiesByCountry } from "../services";

const countriesQuery = {
  queryKey: ["countries"],
  queryFn: async () => await getCountries("asia"),
  options: {
    staleTime: 10000,
  },
};

const countryDetailsQuery = (id: string) => ({
  queryKey: ["country-details", id],
  queryFn: async () => await getUniversitiesByCountry(id),
  options: {
    staleTime: 10000,
  },
});

export { countriesQuery, countryDetailsQuery };
