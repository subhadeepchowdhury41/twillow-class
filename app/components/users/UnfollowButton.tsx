'use client';

import { useSession } from "next-auth/react";
import Button from "../ui/Button";
import { unfollowUser } from "@/services/userServicesClient";

export function UnfollowButton({
  followerId,
}: {
  followerId: string
  }) {
  const {data: session} = useSession();
  return (
    <a>
      <Button onClick={async () => {
        await unfollowUser(
          session?.user.id!,
          followerId,
          session?.user.accessToken!
        ).then(() => {
          window.location.reload();
        });
      }} label="Unfollow" secondary />
    </a>
  );
}