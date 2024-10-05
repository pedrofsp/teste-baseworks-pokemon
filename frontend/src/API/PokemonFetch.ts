import { PostGraphQl } from "./BaseCall";
import { GetPokemonsResponse } from "../types/interfaces";

export async function GetPokemons(
  limit: number = 20,
  offset: number = 0,
  orderByName: boolean = false,
  name?: string,
  id?: number,
  type?: string // Novo parâmetro opcional
): Promise<GetPokemonsResponse | null> {
  let whereCondition = "";

  if (id !== undefined) {
    whereCondition = `, where: { id: { _eq: ${id} } }`;
  } else if (name) {
    whereCondition = `, where: { name: { _ilike: "%${name}%" } }`;
  } else if (type) {
    // Adicionando condição de filtro por tipo de Pokémon
    whereCondition = `, where: { pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: "${type}" } } } }`;
  }

  const orderBy = orderByName ? "name: asc" : "id: asc";

  const query = `
    query all_pokemons {
      all_pokemons: pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}, order_by: { ${orderBy} }${whereCondition}) {
        id
        name
        type: pokemon_v2_pokemontypes {
            pokemon_v2_type {
                id
                name
            }
        }
        assets: pokemon_v2_pokemonsprites {
            sprites
        }
      }
    }
  `;

  try {
    const res = await PostGraphQl<GetPokemonsResponse>(query);
    console.log(res);

    return res;
  } catch (error) {
    console.error("Error fetching Pokemons: ", error);
    return null;
  }
}
