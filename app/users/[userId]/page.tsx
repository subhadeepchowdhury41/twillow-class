import { getClient } from "@/lib/apollo-client";
import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";

interface UserInfo {
  username: string;
  name: string;
  pfp: string;
  bio: string;
}

const GET_USER = gql`
  query GetUser($id: ID!) {
    fetchUser(id: $id) {
      username
      name
      pfp
      bio
    }
  }
`;

export default async function User({params}: {params: {userId: string}}) {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const client = getClient(session?.user.accessToken);
  const { data, error, loading } = await client.getClient().query({
    query: GET_USER,
    variables: {
      id: params.userId
    }
  });
  return (
    <div className="h-screen bg-black text-white">
      {params.userId}
      {JSON.stringify(data.fetchUser)}
    </div>
  );
}