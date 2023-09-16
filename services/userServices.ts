
import { getClientSideClient } from "@/lib/apollo-csclient";
import { getServerSideClient } from "@/lib/apollo-ssclient";
import { gql } from "@apollo/client";

export const getUserFollowings = async (accessToken: string) => {
  const client = getServerSideClient(accessToken);
  const {data} = await client.getClient().query({
    query: gql`
      query {
        fetchUser {
          _id
          followings {
            _id
          }
        }
      }
    `,
  });
  return data.fetchUser.followings;
}

export const checkFollowing = async (userId: string, followerId: string, token: string) => {
  const client = getServerSideClient(token);
  const {data} = await client.getClient().query({
    query: gql`
      query($userId: String!) {
        fetchUser(id: $userId) {
          _id
          followings {
            _id
          }
        }
      }
    `,
    variables: {
      userId
    },
  });
  let followings = data.fetchUser.followings as any[];
  console.log(followings);
  
  return followings.findIndex((following: any) => following._id === followerId) !== -1;
}

export const followUser = async (userId: string, followerId: string, token: string) => {
  const client = getServerSideClient(token);
  const { data } = await client.getClient().mutate({
    mutation: gql`
      mutation FollowUser($userId: String!, $followerId: String!) {
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
      mutation UnfollowUser($userId: String!, $followerId: String!) {
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