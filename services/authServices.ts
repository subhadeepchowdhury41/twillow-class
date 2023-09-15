
import { getServerSideClient } from "@/lib/apollo-ssclient";
import { gql } from "@apollo/client";

export const signInWithUsernameAndPassword = async (username: string, password: string) => {
  const client = getServerSideClient();
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

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      _id
    }
  }
`;

export const signUp = async (
  username: string,
  password: string,
  email: string,
  name: string
) => {
  const client = getServerSideClient();
  const { data } = await client.getClient().mutate({
    mutation: CREATE_USER,
    variables: {
      username,
      password,
      email,
      name
    },
  });
  return data;
}