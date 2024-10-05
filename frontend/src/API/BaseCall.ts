const baseUrlRest = "https://pokeapi.co/api/v2";
const graphQLUrl = "https://beta.pokeapi.co/graphql/v1beta";

async function get<T>(endpoint: string, isUrl: boolean = false): Promise<T> {
  try {
    let res: Response;
    if (isUrl) res = await fetch(endpoint);
    else res = await fetch(baseUrlRest + endpoint);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data: " + error);
    throw error;
  }
}

async function PostGraphQl<T>(query: string, variables?: any): Promise<T> {
  try {
    const res = await fetch(graphQLUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const json = await res.json();
    if (json.errors) {
      console.error("GraphQL errors: ", json.errors);
      throw new Error(
        json.errors.map((error: any) => error.message).join(", ")
      );
    }
    return json.data;
  } catch (error) {
    console.error("Error fetching data from GraphQL: " + error);
    throw error;
  }
}

export { get, PostGraphQl };
