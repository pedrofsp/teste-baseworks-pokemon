const baseUrl = "https://pokeapi.co/api/v2";

async function get<T>(endpoint: string, isUrl: boolean = false): Promise<T> {
  try {
    let res: Response;
    if (isUrl) res = await fetch(endpoint);
    else res = await fetch(baseUrl + endpoint);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data: " + error);
    throw error;
  }
}

export { get };
