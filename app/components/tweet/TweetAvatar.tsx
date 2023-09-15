import { getClient } from "@/lib/apollo-client";
import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";

const GET_USER = gql`
  query GetUser($userId: ID!) {
    fetchUser(id: $userId) {
      _id
      username
      name
    }
  }
`;

export default async function TweetAvatar({ userId, }: { userId: string }) {
  const session = await getServerSession(authOptions);
  const client = getClient(session?.user.accessToken);
  const { data, error, loading } = await client.getClient().query({
    query: GET_USER,
    variables: { userId }
  });
  if (loading) return (<div>Loading...</div>);
  if (error) return (<div>{error.message}</div>);
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-bold ">{data.fetchUser.name}</h1>
      <h2 className="text-[#4a4e51]">@{ data.fetchUser.username}</h2>
    </div>
  );
}