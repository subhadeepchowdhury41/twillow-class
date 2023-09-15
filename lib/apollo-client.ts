import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { NextSSRApolloClient, NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";

const getClient = (accessToken?: string) => registerApolloClient(() => {
  return new NextSSRApolloClient({
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
    cache: new NextSSRInMemoryCache(),
  });
});

export { getClient };