import { getServerSideClient } from "@/lib/apollo-ssclient";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

export default async function POST(userId: string, followerId: string, token: string) {
  const client = getServerSideClient();
  const { data } = await client.getClient().mutate({
    mutation: gql`
      mutation FollowUser($userId: String!, $followerId: String!) {
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
  return NextResponse.json(data);
}