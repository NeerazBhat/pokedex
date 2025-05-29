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
  habitats: string[];
  classification: string;
}

export interface IFilterList {
  id: number;
  name: string;
  type: string[];
  habitat: string;
  classification: string;
  url: string;
}
