
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import TweetComponent from "../components/tweet/TweetComponent";
import { gql } from "@apollo/client";
import PostTweetForm from "../components/tweet/PostTweetForm";
import { getServerSideClient } from "@/lib/apollo-ssclient";

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    listTweets {
      _id
      text
      media
      author {
        _id
      }
      dateTime
    }
  }
`;

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const client = getServerSideClient(session?.user.accessToken);
  const { data, error, loading } = await client.getClient().query({
    query: GET_ALL_POSTS,
  });
  return (
    <div className="h-screen bg-black text-white">
      <div className="h-28 flex flex-col justify-between border-b-[1px]
      border-neutral-800"
      >
        <div className="mx-4 my-2 font-bold text-2xl">
          Home
        </div>
        <div className="flex h-24 font-semibold text-lg">
          <div className="
            cursor-pointer
            justify-center
            hover:bg-neutral-800 
            flex
            items-center
            flex-1"
          >
            For You
          </div>
          <div className="
            justify-center
            cursor-pointer
            flex
            hover:bg-neutral-800 
            flex-1
            items-center"
          >
            Following
          </div>
        </div>
      </div>
      <PostTweetForm userId={session?.user.id!} />
      {
        (data.listTweets).map((tweet: any, index: number) => {
          return (
            <TweetComponent key={index} text={tweet.text} author={tweet.author._id} dateTime={tweet.dateTime} media={tweet.media} />
          );
        })
      }
    </div>
  );
}