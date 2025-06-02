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
  types?: [{ value: string }] | undefined;
  habitats?: { value: string } | undefined;
  classification?: { value: string } | undefined;
}

export interface IFilterList {
  id: number;
  name: string;
  type: string[];
  habitat: string;
  classification: string;
  url: string;
}
