import type { TCountry } from "../types/countries";
import { TUniversity } from "../types/university";

const getCountries = async (continent: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${continent}?fields=name`
  );
  const data = (await response.json()) as TCountry[];
  return data.map(({ name }) => name);
};

const getUniversitiesByCountry = async (country: string) => {
  const response = await fetch(
    `http://universities.hipolabs.com/search?country=${country}`
  );
  return (await response.json()) as TUniversity[];
};

export { getCountries, getUniversitiesByCountry };
