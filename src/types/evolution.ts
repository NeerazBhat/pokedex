export interface IEvolutionDetail {
  chain: {
    species: {
      name: string;
    };
    evolves_to: {
      species: {
        name: string;
      };
      evolves_to: {
        species: {
          name: string;
        };
      };
    };
  };
}
