const graphQLUrl = "https://beta.pokeapi.co/graphql/v1beta";

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

export { PostGraphQl };
