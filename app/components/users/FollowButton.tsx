/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { checkFollowing, followUser, unfollowUser } from "@/services/userServices";
import { useSession } from "next-auth/react";

export default function FollowButton({
  followerId
}: {
  followerId: string
  }) {
  const [following, setFollowing] = useState<boolean>(false);
  useEffect(() => {
    const checkUser = async () => {
      await checkFollowing(
        session?.user.id!,
        followerId,
        session?.user.accessToken!
      ).then(res => {
        setFollowing(res);
      });
    }
    checkUser();
  }, []);
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
            setFollowing(true);
          });
        }} label="Follow" secondary />
      )}
  </div>);
}