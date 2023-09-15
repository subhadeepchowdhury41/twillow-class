import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export const signInWithUsernameAndPassword = async (username: string, password: string) => {
  const client = getClient();
  console.log("Trying to sign in...........");
  
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
  console.log(data);
  return JSON.parse(data.loginUser);
}