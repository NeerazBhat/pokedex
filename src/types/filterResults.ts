export interface IFilterResults {
  count: number;
  results: Array<{
    id: number;
    name: string;
    type: string[];
    habitat: string;
    classification: string;
  }>;
}

export interface IFilterPayload {
  types: string[];
}
