export interface IEvolutionDetail {
  chain: {
    species: {
      name: string;
    };
    evolves_to: Array<{
      species: {
        name: string;
      };
      evolves_to: Array<{
        species: {
          name: string;
        };
      }>;
    }>;
  };
}
