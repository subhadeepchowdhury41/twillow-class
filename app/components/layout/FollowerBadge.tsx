import { getServerSideClient } from "@/lib/apollo-ssclient";
import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import Avatar from "../ui/Avatar";

export default async function FollowerBatch({ id }: { id: string }) {
  const session = await getServerSession(authOptions);
  const client = getServerSideClient(session?.user.accessToken);
  const { data } = await client.getClient().query({
    query: gql`
      query($userId:ID!) {
        fetchUser(id: $userId) {
          _id
          username
          name
        }
      },
    `,
    variables: {
      userId: id
    }
  });
  return (
    <div className="w-full h-16 bg-neutral-800 pt-4 flex gap-2">
      <Avatar userId={id} />
      <div className="w-full h-full flex-[5] flex flex-col">
        <div className="font-semibold text-lg w-48 truncate text-[rgba(255,255,255,0.9)]">{data.fetchUser.name}</div>
        <div className="font-semibold text-[12px] w-44 truncate text-[rgba(255,255,255,0.7)]">@{data.fetchUser.username}</div>
      </div>
    </div>
  );
}