export interface IPokemonDetail {
  abilities: [];
  id: number;
  height: number;
  weight: number;
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }];
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
}
