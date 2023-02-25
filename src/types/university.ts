export interface TRawUniversity {
  domains: string[];
  name: string;
  web_pages: string[];
  country: string;
  "state-province": string | null;
  alpha_two_code: string;
}

export interface TUniversity
  extends Pick<
    TRawUniversity,
    Exclude<keyof TRawUniversity, "state-province">
  > {
  state: string | null;
}
