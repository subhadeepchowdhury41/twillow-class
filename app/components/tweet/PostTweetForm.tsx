'use client';

import { useState, useRef } from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { TfiImage } from "react-icons/tfi";
import { postTweet } from "@/services/tweetServices";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

const PostTweetForm = ({
  userId,
}: { userId: string }) => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (media.length >= 5) return;
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      newFiles.forEach(async (file) => {
        let form: FormData = new FormData();
        form.append('file', file);
        axios.post(
          'https://busy-gray-shrimp-suit.cyclic.cloud/upload',
          form,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        ).then(res => {
          setMedia([...media, res.data.url]);
          console.log("Added media: ", res.data.url);
        }).catch(err => {
          console.log(err);
        });
      });
    };
  };

  return (<div className="flex border-b-[1px]
  p-2 border-neutral-800" >
    <div className="flex items-center flex-col w-full  ">
      <div className="w-full h-full flex-[2] flex items-center px-2 gap-2">
        <Avatar userId={userId} />
        <TextInput noborder
          onChange={(e) => setText(e.target.value)}
          placeholder={'What is Happening?'}
        />
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        {media.map((url, index) => {
          return (
            <div key={index} className="
              mx-16
              w-60
              flex
              justify-start
              relative
            ">
              <div onClick={() => {
                setMedia(media.filter((_, i) => i !== index));
              }} className="absolute right-2 top-2 z-10">
                <AiFillCloseCircle size={ 25} />
              </div>
              <div className="
                w-60
                h-60
                border-l-[1px]
                rounded-xl
                border-l-[rgba(255,255,255,0.2)]
              "
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                }}
                key={index}
              />
            </div>
          )
        })}
      </div>
      <div className="w-full h-full flex-[1] flex justify-end items-end px-4">
        <div className="flex items-end pr-4 mb-[6px] gap-4">
          <input
            type="file"
            id="file"
            className="hidden"
            ref={hiddenInputRef}
            onChange={handleFileInputChange}
            multiple
          />
          <label htmlFor="file">
            <TfiImage size={23} />
          </label>
          <div className="border-[1px] rounded-[20px] px-2">
            Everyone
          </div>
        </div>
        <div className="border-l-[1px] border-l-[rgba(255,255,255,0.2)] px-2">
          <Button onClick={async () => {
            await postTweet(text, media, userId, session?.user.accessToken!).then(res => {
              console.log(res);
              window.location.reload();
            });
          }} label="Post" />
        </div>
      </div>
    </div>
  </div>);
}

export default PostTweetForm;