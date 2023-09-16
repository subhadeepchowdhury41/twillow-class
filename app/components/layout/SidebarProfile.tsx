import Avatar from "../ui/Avatar";
import { getServerSession } from "next-auth";
import { gql } from "@apollo/client";
import { authOptions } from "@/lib/auth";
import { getServerSideClient } from "@/lib/apollo-ssclient";

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

export default async function SidebarProfile() {
  const session = await getServerSession(authOptions);
  const client = getServerSideClient(session?.user.accessToken);
  const { data } = await client.getClient().query({
    query: GET_USER,
    variables: {
      id: session?.user.id!
    }
  });
  return (
    <div className="flex gap-2 rounded-full p-2 items-center hover:bg-gray-900 cursor-pointer">
      <div>
        <Avatar userId={session?.user.id!} />
      </div>
      <div className="lg:flex hidden flex-col justify-center">
        <div className="text-white font-extrabold w-40 truncate">
          {data?.fetchUser.name}
        </div>
        <div className="text-teal-500 text-sm w-40 truncate">
          @{data?.fetchUser.username}
        </div>
      </div>
    </div>
  );
}