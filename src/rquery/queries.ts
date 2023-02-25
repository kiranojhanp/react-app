import { getCountries, getUniversitiesByCountry } from "../services";

const countriesQuery = (id?: string) => ({
  queryKey: ["countries", id],
  queryFn: async () => await getCountries(id || "asia"),
  options: {
    staleTime: 10000,
  },
});

const countryDetailsQuery = (id?: string) => ({
  queryKey: ["country-details", id],
  queryFn: async () => await getUniversitiesByCountry(id || ""),
  options: {
    staleTime: 10000,
  },
});

export { countriesQuery, countryDetailsQuery };
