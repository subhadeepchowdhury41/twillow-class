import { getClientSideClient } from "@/lib/apollo-csclient";
import { gql } from "@apollo/client";

export const fetchUser = async (userId: string, token: string) => {
  const client = getClientSideClient(token);
  const { data } = await client.query({
    query: gql`
      query FetchUser($userId: ID!) {
        fetchUser(id: $userId) {
          _id
          name
          followers {
            _id
          }
          followings {
            _id
          }
          username
          email
          bio
          pfp
        }
      }
    `,
    variables: {
      userId,
    },
  });
  return data.fetchUser;
}

export const updateUser = async (userId: string, name: string, bio: string, pfp: string, token: string) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation UpdateUser($userId: ID!, $name: String!, $bio: String!, $pfp: String!) {
        updateUser(id: $userId, name: $name, bio: $bio, pfp: $pfp) {
          _id
          name
          username
          email
          bio
          pfp
        }
      }
    `,
    variables: {
      userId,
      name,
      bio,
      pfp
    },
  });
  return data.updateUser;
}

export const followUser = async (userId: string, followerId: string, token: string) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation FollowUser($userId: ID!, $followerId: ID!) {
        followUser(userId: $userId, followerId: $followerId) {
          followings {
            _id
          }
          followers {
            _id
          }
        }
      }
    `,
    variables: {
      userId,
      followerId
    },
  });
  return data;
}

export const unfollowUser = async (userId: string, followerId: string, token: string) => {
  const client = getClientSideClient(token);
  const { data } = await client.mutate({
    mutation: gql`
      mutation UnfollowUser($userId: ID!, $followerId: ID!) {
        unfollowUser(userId: $userId, followerId: $followerId) {
          followings {
            _id
          }
          followers {
            _id
          }
        }
      }
    `,
    variables: {
      userId,
      followerId
    },
  });
  return data;
}