import { getServerSideClient } from "@/lib/apollo-ssclient";
import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import { UnfollowButton } from "./UnfollowButton";
import { FollowButton } from "./FollowButton";
import EditProfileButton from "./EditProfileButton";

const GET_FOLLOWINGS = gql`
  query ListFollowings($userId: ID!) {
    listFollowings(id: $userId) {
      _id
    }
  }
`;

export default async function ActionButton({
  followerId,
}: {
  followerId: string
}) {
  const session = await getServerSession(authOptions);
  const client = getServerSideClient(session?.user.accessToken);
  const { data, loading } = await client.getClient().query({
    query: GET_FOLLOWINGS,
    variables: { userId: session?.user.id },
  });
  if (loading) return null;
  let following: boolean = data.listFollowings.map(
    (f: any) => f._id
  ).includes(followerId);
  console.log(data.listFollowings, following);
  
  return (
    <div>
      {session?.user.id === followerId ? <EditProfileButton/> : following ? (
        <UnfollowButton followerId={followerId} />
      ) : (
        <FollowButton followerId={followerId} />
      )}
    </div>
  );
}