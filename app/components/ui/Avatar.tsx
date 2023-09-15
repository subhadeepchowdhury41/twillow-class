
import { getClient } from "@/lib/apollo-client";
import { authOptions } from "@/lib/auth";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import Image from "next/image";

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

const Avatar: React.FC<AvatarProps> = async ({ userId, isLarge, hasBorder }) => {
  const client = getClient();
  const session = await getServerSession(authOptions);
  const { data, error, loading } = await client.getClient().query({
    query: GET_USER_INFO,
    variables: {
      userId: userId,
    },
  });
  
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
      <a href={`/user/${userId}`}>
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        src={data?.fetchUser?.pfp || 'https://www.gravatar.com/avatar'}
        />
        </a>
    </div>
  );
}
 
export default Avatar;