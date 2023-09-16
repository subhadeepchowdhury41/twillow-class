'use client';

import { useSession } from "next-auth/react";
import Button from "../ui/Button";
import { followUser } from "@/services/userServicesClient";

export function FollowButton({
  followerId,
}: {
  followerId: string
  }) {
  const {data: session} = useSession();
  return (
    <a>
      <Button onClick={async () => {
        await followUser(
          session?.user.id!,
          followerId,
          session?.user.accessToken!
        ).then(() => {
          window.location.reload();
        });
      }} label="Follow" secondary />
    </a>
  );
}