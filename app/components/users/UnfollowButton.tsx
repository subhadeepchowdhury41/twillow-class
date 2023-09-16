import { getServerSideClient } from "@/lib/apollo-ssclient";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Button from "../ui/Button";
import { unfollowUser } from "@/services/userServices";

export async function UnfollowButton({
  followerId,
}: {
  followerId: string
}) {
  const session = await getServerSession(authOptions);
  const client = getServerSideClient(session?.user.accessToken);
  return (
    <a>
      {/* <Button label="Follow" secondary /> */}
    </a>
  );
}