import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export const followUser = async (userId: string, followerId: string, token: string) => {
  const client = getClient(token);
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