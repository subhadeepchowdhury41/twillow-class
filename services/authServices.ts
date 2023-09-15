import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export const signInWithUsernameAndPassword = async (username: string, password: string) => {
  const client = getClient();
  const { data  } = await client.getClient().mutate({
    mutation: gql`
      mutation SignIn($username: String!, $password: String!) {
        loginUser(username: $username, password: $password)
      }
    `,
    variables: {
      username,
      password,
    },
  });
  return JSON.parse(data.logInUser);
}