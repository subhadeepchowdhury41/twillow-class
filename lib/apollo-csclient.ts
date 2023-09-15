import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const getClientSideClient = (accessToken?: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      fetchOptions: {
        cache: "no-store",
        revalidate: 1
      },
    }),
    cache: new InMemoryCache(),
  });
};

export { getClientSideClient };