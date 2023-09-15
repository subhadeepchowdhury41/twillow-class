'use client';

import { ChangeEventHandler, useState } from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { TfiImage } from "react-icons/tfi";
import { followUser, postTweet } from "@/services/tweetServices";
import { useSession } from "next-auth/react";

const PostTweetForm = ({
  userId,
}: { userId: string }) => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  return (<div className="flex">
    <div className="flex items-center flex-col w-full h-36">
      <div className="w-full h-full flex-[2] flex items-center px-4 gap-2">
        <Avatar userId={userId} />
        <TextInput noborder onChange={() => { }} placeholder={'What is Happening?'} />
      </div>
      <div className="w-full h-full flex-[1] flex justify-end px-4">
        <div className="flex items-center pr-4 mb-[6px] gap-2">
          <input type="file" id="file" className="hidden" />
          {/* huerwiuwehfuewhurfhr */}
          <TfiImage />
          <div className="border-[1px] rounded-[20px] px-2">
            Everyone
          </div>
        </div>
        <div className="border-l-[1px] border-l-[rgba(255,255,255,0.2)] px-2">
          <Button onClick={async () => {
            await postTweet(text, media, userId, session?.user.accessToken!).then(res => {
              console.log(res);
            });
          }} label="Post" />
        </div>
      </div>
    </div>
  </div>);
}

export default PostTweetForm;