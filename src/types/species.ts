export interface ISpeciesDetail {
  evolution_chain: {
    url: string;
  };
  id: number;
  generation: {
    name: string;
  };
  hatch_counter: number;
  egg_groups: [{ name: string }];
}
