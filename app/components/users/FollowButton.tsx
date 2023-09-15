'use client';

import { useState } from "react";
import Button from "../ui/Button";
import { followUser, unfollowUser } from "@/services/tweetServices";
import { useSession } from "next-auth/react";

export default function FollowButton({
  followerId
}: {
  followerId: string
  }) {
  const [following, setFollowing] = useState<boolean>(false);
  const { data: session } = useSession();
  return (<div>
    {following ? (
      <Button onClick={async () => {
        await unfollowUser(session?.user.id!,
          followerId,
          session?.user.accessToken!
        ).then(res => {
          setFollowing(false);
        });
      }} label="Unfollow" outline secondary />
    ) : (
        <Button onClick={async () => {
          await followUser(session?.user.id!,
            followerId,
            session?.user.accessToken!
          ).then(res => {
            setFollowing(false);
          });
        }} label="Follow" secondary />
      )}
  </div>);
}