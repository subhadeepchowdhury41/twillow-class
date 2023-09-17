import { getServerSideClient } from "@/lib/apollo-ssclient";
import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import FollowerBatch from "./FollowerBadge";


const FollowBar = async () => {
  const session = await getServerSession(authOptions);
  const client = getServerSideClient(session?.user.accessToken);
  const { data } = await client.getClient().query({
    query: gql`
      query($userId:ID!) {
        listFollowings(id: $userId) {
          _id
        }
      }
    `,
    variables: {
      userId: session?.user.id
    }
  });
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4 flex flex-col">
        <h2 className="text-white text-xl font-extrabold">People you follow</h2>
        {data.listFollowings.map((id: any, index: number) => {
          return (
            <FollowerBatch key={index} id={id._id} />
          )
        })}
      </div>
    </div>);
}

export default FollowBar;