// Import the function to test
import { PostGraphQl } from "../../API/BaseCall"; // Ajuste o caminho conforme necessário

// Mock fetch globally
global.fetch = jest.fn();

describe("PostGraphQl", () => {
  // Mock do console.error para suprimir os logs durante os testes
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return data when the request is successful", async () => {
    const mockData = { data: { pokemon: { name: "Pikachu" } } };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
      ok: true,
    });

    const query = `
      query {
        pokemon(name: "Pikachu") {
          name
        }
      }
    `;

    const result = await PostGraphQl(query);

    expect(fetch).toHaveBeenCalledWith(
      "https://beta.pokeapi.co/graphql/v1beta",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: undefined,
        }),
      }
    );

    expect(result).toEqual(mockData.data);
  });

  test("should throw an error when GraphQL returns errors", async () => {
    const mockErrorResponse = {
      errors: [{ message: "Something went wrong" }],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      ok: true,
    });

    const query = `
      query {
        pokemon(name: "Pikachu") {
          name
        }
      }
    `;

    await expect(PostGraphQl(query)).rejects.toThrow("Something went wrong");
  });

  test("should throw an error when the fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const query = `
      query {
        pokemon(name: "Pikachu") {
          name
        }
      }
    `;

    await expect(PostGraphQl(query)).rejects.toThrow("Network error");
  });
});
