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
        listFollowings(id: $userId) {
          _id
        }
      }
    `,
    variables: {
      userId
    },
  });
  return data.listFollowings.map(
    (f: any) => f._id
  ).includes(followerId);
}