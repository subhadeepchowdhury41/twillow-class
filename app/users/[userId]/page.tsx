import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import { getServerSideClient } from "@/lib/apollo-ssclient";
import ActionButton from "@/app/components/users/ActionButton";

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

export default async function User({ params }: { params: { userId: string } }) {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const client = getServerSideClient(session?.user.accessToken);
  const { data, error, loading } = await client.getClient().query({
    query: GET_USER,
    variables: {
      id: params.userId
    }
  });
  return (
    <div className="h-screen bg-black text-white">
      <div className="w-full relative h-52 bg-gray-500 flex items-center px-4 justify-between">
        <div className="absolute bottom-[-80px] w-[160px] h-[160px] rounded-[50%]" style={{ backgroundImage: `url(${data.fetchUser.pfp})`, backgroundSize: '100% 100%' }}></div>
      </div>
      <div className="w-full h-20 flex items-center justify-end pr-4">
        <ActionButton followerId={params.userId} />
      </div>
      <div className="w-full font-bold text-xl pt-4 px-4">
        {data.fetchUser.name}
      </div>
      <div className="w-full font-[100] text-gray-500 text-[16px] px-4">
        @{data.fetchUser.username}
      </div>
      <div className="w-full font-[400] text-lg pt-4 px-4">
        {data.fetchUser.name}
      </div>
    </div>
  );
}