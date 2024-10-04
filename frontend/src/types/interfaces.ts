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
}

interface ApiResponse {
  results: Pokemon[];
  next: string | null;
  previous: string | null;
}

export type { PokemonDetails, ApiResponse, Pokemon, PokemonType };
