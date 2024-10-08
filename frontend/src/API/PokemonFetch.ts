import { PostGraphQl } from "./BaseCall";
import { GetPokemonsResponse, PokemonEvolutions } from "../types/interfaces";

//função responsavel por receber instruções de como deve ser a query, afim de retornar os dados já filtrados da forma que o usuario desejar
export async function GetPokemons(
  limit: number = 20,
  offset: number = 0,
  orderByName: boolean = false,
  name?: string | null,
  id?: number[] | null,
  type?: string | null
): Promise<GetPokemonsResponse | null> {
  let whereCondition = "";

  if (id)
    whereCondition = `, where: { id: { _in: [${id.map((id) => `${id},`)}] } }`;
  else {
    let conditions: string[] = [];
    if (name) conditions.push(`name: { _ilike: "%${name}%" }`);
    if (type)
      conditions.push(
        `pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: "${type}" } } }`
      );
    if (conditions.length > 0)
      whereCondition = `, where: { ${conditions.join(", ")} }`;
  }

  const orderBy = orderByName ? "name: asc" : "id: asc";
  const query = `
    query all_pokemons {
      all_pokemons: pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}, order_by: { ${orderBy} }${whereCondition}) {
        id
        name
        type: pokemon_v2_pokemontypes {
          type_object: pokemon_v2_type {
            id
            name
          }
        }
        assets: pokemon_v2_pokemonsprites {
          sprites
        }
        stats: pokemon_v2_pokemonstats {
          base_stat
          stat_name: pokemon_v2_stat {
            name
          }
        }
      }
    }
  `;

  try {
    const res = await PostGraphQl<GetPokemonsResponse>(query);
    return res;
  } catch (error) {
    console.error("Error fetching Pokemons: ", error);
    return null;
  }
}

//foi necessário uma segunda função para conseguir a cadeia de evolução de um pokemon, uma vez que não consegui uma forma de acessa-la pela query do GetPokemons()
export async function GetPokemonsEvolutions(
  pokemonId: number
): Promise<PokemonEvolutions | null> {
  const query = `
      query GetPokemonEvolutions {
        all_pokemon_evolutions: pokemon_v2_pokemonspecies(where: { id: { _eq: ${pokemonId} } }) {
          evolution_chain: pokemon_v2_evolutionchain {
            species: pokemon_v2_pokemonspecies {
              name
              id
            }
          }
        }
      }
    `;

  try {
    const res = await PostGraphQl<any>(query);
    return res;
  } catch (error) {
    console.error("Error fetching Pokémon evolutions: ", error);
    return null;
  }
}
