import { GetPokemons, GetPokemonsEvolutions } from "../../API/PokemonFetch"; // Ajuste o caminho conforme necessário
import { GetPokemonsResponse } from "../../types/interfaces"; // Ajuste o caminho conforme necessário
import { PostGraphQl } from "../../API/BaseCall"; // Ajuste o caminho conforme necessário

jest.mock("../../API/BaseCall");

describe("PokemonFetch", () => {
  // Espionar o console.error para verificar se é chamado corretamente
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks(); // Restaurar o console.error após os testes
  });

  describe("GetPokemons", () => {
    test("should return data when the request is successful", async () => {
      const mockResponse: GetPokemonsResponse = {
        all_pokemons: [
          {
            id: 1,
            name: "Bulbasaur",
            type: [
              {
                type_object: {
                  id: 12,
                  name: "Grass",
                },
              },
            ],
            assets: [
              {
                sprites: {
                  other: {
                    showdown: {
                      front_default: "sprite_url", // Ajuste conforme necessário
                    },
                  },
                },
              },
            ],
            stats: [
              {
                base_stat: 45,
              },
            ],
          },
        ],
      };

      (PostGraphQl as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await GetPokemons(20, 0, false);
      expect(result).toEqual(mockResponse);
      expect(PostGraphQl).toHaveBeenCalledWith(expect.any(String));
    });

    test("should return null and log an error when the request fails", async () => {
      // Simulando um erro de rede
      (PostGraphQl as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await GetPokemons(20, 0, false);

      // Verificar se o console.error foi chamado corretamente
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching Pokemons: ",
        new Error("Network error")
      );
      expect(result).toBeNull();
    });

    test("should handle an empty response gracefully", async () => {
      const mockEmptyResponse: GetPokemonsResponse = {
        all_pokemons: [],
      };

      (PostGraphQl as jest.Mock).mockResolvedValueOnce(mockEmptyResponse);

      const result = await GetPokemons(20, 0, false);
      expect(result).toEqual(mockEmptyResponse);
      expect(PostGraphQl).toHaveBeenCalledWith(expect.any(String));
    });

    test("should handle missing fields in response", async () => {
      const mockPartialResponse: GetPokemonsResponse = {
        all_pokemons: [
          {
            id: 1,
            name: "Bulbasaur",
            type: [],
            assets: [],
            stats: [],
          },
        ],
      };

      (PostGraphQl as jest.Mock).mockResolvedValueOnce(mockPartialResponse);

      const result = await GetPokemons(20, 0, false);
      expect(result).toEqual(mockPartialResponse);
      expect(PostGraphQl).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe("GetPokemonsEvolutions", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch evolutions for a valid Pokemon ID", async () => {
      const mockResponse = {
        data: {
          all_pokemon_evolutions: [
            {
              evolution_chain: {
                species: [
                  { name: "Bulbasaur", id: 1 },
                  { name: "Ivysaur", id: 2 },
                  { name: "Venusaur", id: 3 },
                ],
              },
            },
          ],
        },
      };

      (PostGraphQl as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await GetPokemonsEvolutions(1);
      expect(result).toEqual(mockResponse);
      expect(PostGraphQl).toHaveBeenCalledTimes(1);
    });

    it("should return null and log an error if the fetch fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
      (PostGraphQl as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await GetPokemonsEvolutions(1);
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching Pokémon evolutions: ",
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
