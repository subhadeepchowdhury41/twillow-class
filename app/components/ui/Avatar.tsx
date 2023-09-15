/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { getClientSideClient } from "@/lib/apollo-csclient";
import { gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

interface UserInfo {
  _id: string;
  pfp: string;
}

const GET_USER_INFO = gql`
  query GetUserInfo($userId: ID!) {
    fetchUser(id: $userId) {
      _id
      pfp
    }
  }
`;

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: session } = useSession();
  const client = getClientSideClient(session?.user.accessToken);
  const [data, setData] = useState<UserInfo | null>();
  const fetchUserInfo = async () => {
    const { data } = await client.query({
      query: GET_USER_INFO,
      variables: {
        userId: userId,
      },
    });
    console.log(data);
    setData(data.fetchUser);
  }

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);
  
  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-10'}
        ${isLarge ? 'w-32' : 'w-10'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <a href={`/users/${userId}`}>
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        src={data?.pfp || 'https://www.gravatar.com/avatar'}
        />
        </a>
    </div>
  );
}
 
export default Avatar;