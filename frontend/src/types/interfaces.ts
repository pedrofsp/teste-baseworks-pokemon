interface Pokemon {
  name: string;
  url: string;
  details?: PokemonDetails;
}

interface PokemonDetails {
  id: string;
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
        name: String;
        url: String;
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
