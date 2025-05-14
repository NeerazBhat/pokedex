export interface IEvolutionDetail {
  chain: {
    species: {
      name: string;
    };
    evolves_to: [
      {
        evolves_to: [
          {
            species: {
              name: string;
            };
          }
        ];
        species: {
          name: string;
        };
      }
    ];
  };
}
