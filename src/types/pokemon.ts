export interface IPokemonDetail {
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
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
      showdown: {
        front_default: string;
      };
    };
  };
  moves: Array<{
    move: {
      name: string;
    };
    version_group_details: [
      {
        level_learned_at: number;
        move_learn_method: string;
      },
      version_group: {
        name: string;
      }
    ];
  }>;
  types: Array<{ type: { name: string } }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface IPokemonList {
  count: number;
  results: Array<{ name: string; url: string }>;
}
