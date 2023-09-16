import { getSession } from "next-auth/react";
import { FollowButton } from "./FollowButton";
import { UnfollowButton } from "./UnfollowButton";
import { getServerSideClient } from "@/lib/apollo-ssclient";
import { gql } from "@apollo/client";

export default async function ActionButton({
  followerId,
}: {
  followerId: string
  }) {
  const session = await getSession();
  const client = getServerSideClient(session?.user.accessToken);
  const { data, loading } = await client.getClient().query({
    query: gql`
      query GetFollowing($userId: ID!) {
        listFollowings(userId: $userId)
      }
    `,
    variables: {
      userId: session?.user.id
    }
  });
  if (loading) return null;
  let following: boolean = data.listFollowings.map(
    (f: any) => f._id
  ).includes(followerId);
  return (
    <div>
      {session?.user.id === followerId ? null : following ? (
        <UnfollowButton followerId={followerId} />
      ) : (
        <FollowButton followerId={followerId} />
      )}
    </div>
  );
}