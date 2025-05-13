export interface IPokemonDetail {
  abilities: [
    {
      ability: {
        name: string;
      };
      is_hidden: boolean;
      slot: number;
    }
  ];
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
  moves: [
    {
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
    }
  ];
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
