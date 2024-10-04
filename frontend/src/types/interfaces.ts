interface Pokemon {
  name: string;
  url: string;
  details?: PokemonDetails;
}

interface PokemonDetails {
  id: number;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: {
        name: string;
        url: string;
      };
    }
  ];
  stats: {
    base_stat: 45;
    effort: 0;
    stat: {
      name: string;
      url: string;
    };
  }[];
  forms: {
    name: string;
  }[];
}

interface ApiResponse {
  results: Pokemon[];
  next: string | null;
  previous: string | null;
}

interface PokemonChain {
  chain: {
    evolves_to: [
      {
        evolves_to: [
          {
            is_baby: Boolean;
            species: {
              name: string;
              url: string;
            };
          }
        ];
        is_baby: Boolean;
        species: {
          name: string;
          url: string;
        };
      }
    ];
    is_baby: Boolean;
    species: {
      name: string;
      url: string;
    };
  };
}

interface PokemonSpecie {
  evolution_chain: {
    url: string;
  };
}
export type {
  PokemonDetails,
  ApiResponse,
  Pokemon,
  PokemonSpecie,
  PokemonChain,
};
