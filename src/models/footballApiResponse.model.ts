export interface FootballAPIResponse<T> {
  get: string;
  parameters: Parameters;
  errors: Error[];
  results: number;
  paging: Paging;
  response: T[];
}

interface Paging {
  current: number;
  total: number;
}

interface Parameters {
  team: string;
}

interface Error {
  time: string;
  bug: string;
  report: string;
}
