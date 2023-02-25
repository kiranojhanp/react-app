type TNativeName = {
  official: string;
  common: string;
};

type TName = {
  common: string;
  official: string;
  nativeName: TNativeName;
};

type TCountry = {
  name: TName;
};

export type { TCountry, TName };
