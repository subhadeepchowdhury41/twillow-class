import { getClientSideClient } from "@/lib/apollo-csclient";
import { gql } from "@apollo/client";
import { useSession } from "next-auth/react";

interface TweetInfo {
  author: string;
  _id: string;
  media: string[];
  likes: any[];
  comments: any[];
  text: string;
}

const GET_TWEET = gql`
  query GetUser($id: ID!) {
    fetchTweet(id: $id) {
      username
      name
      likes {
        _id
      }
      comments {
        _id
      }
      pfp
      bio
    }
  }
`;

export default async function User({params}: {params: {tweetId: string}}) {
  const {data: session} = useSession();
  console.log(session?.user);
  const client = getClientSideClient(session?.user.accessToken);
  const { data, error, loading } = await client.query({
    query: GET_TWEET,
    variables: {
      id: params.tweetId
    }
  });
  return (
    <div className="h-screen bg-black text-white">
      {params.tweetId}
      {JSON.stringify(data.fetchUser)}
    </div>
  );
}