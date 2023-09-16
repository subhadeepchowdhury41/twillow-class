'use client'

import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useEffect } from 'react'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getLikes, likeTweet, unlikeTweet } from "@/services/tweetServices";

const TweetLike = ({ tweetId }: { tweetId: string }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<string[]>([]);
  const fetchLikes = async () => {
    const res = await getLikes(tweetId, session?.user.accessToken!);
    setLikes(res);
  };
  useEffect(() => {
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return (
    <div className="mt-1 flex gap-2 items-center" onClick={async () => {
      if (likes.includes(session?.user.id!)) {
        await unlikeTweet(tweetId, session?.user.id!, session?.user.accessToken!).then((res) => {
          setLikes(res);
        });
        return;
      }
      await likeTweet(tweetId, session?.user.id!, session?.user.accessToken!).then((res) => {
        setLikes(res);
      });
    }}>
      <div className="flex items-center gap-1 rounded-full cursor-pointer px-2 hover:bg-[#eb54612d]">
        {!likes.includes(session?.user.id!) ? <AiOutlineHeart /> : <FcLike />} {likes.length}
      </div>
      
      <div className="ml-4 flex items-center gap-2">
        {<FaRegCommentDots />} 0
      </div>
    </div>
  )
}

export default TweetLike