
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

export const checkFollowing = async () => {
  const client = getServerSideClient();
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