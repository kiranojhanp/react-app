import type { TCountry } from "../types/countries";

const getCountries = async (continent: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${continent}?fields=name`
  );
  const data = (await response.json()) as TCountry[];
  return data.map(({ name }) => name);
};

const getUniversitiesByCountry = async (country: string) => {
  const data = await fetch(
    `http://universities.hipolabs.com/search?country=${country}`
  );
  return await data.json();
};

export { getCountries, getUniversitiesByCountry };
