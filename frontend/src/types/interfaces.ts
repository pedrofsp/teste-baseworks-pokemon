export interface Pokemon {
  id: number;
  name: string;
  type: {
    type_object: {
      name: string;
      id: number;
    };
  }[];
  assets: {
    sprites: {
      other: {
        showdown: {
          front_default: string;
        };
      };
    };
  }[];
  stats: {
    base_stat: number;
  }[];
}

export interface PokemonEvolutions {
  all_pokemon_evolutions: {
    evolution_chain: {
      species: {
        name: string;
        id: number;
      }[];
    };
  }[];
}

export interface GetPokemonsResponse {
  all_pokemons: Pokemon[];
}
