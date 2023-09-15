import Avatar from "../ui/Avatar";
import TweetAvatar from "./TweetAvatar";
import { timeAgo } from "@/utils/timeAgo";
import Image from "next/image";

export default async function TweetComponent({
  text, author, dateTime, media
}: {
  text: string;
  author: string;
  dateTime: string;
  media: string[];
}) {
  return (<div className="
    p-4
    border-b-[1px]
  border-neutral-800
    flex gap-2"
  >
    <div>
      <Avatar userId={author} />
    </div>
    <div>
      <div className="flex items-center">
        <TweetAvatar userId={author} />
        <div className="mx-1">
          .
        </div>
        <h2 className="text-[#4a4e51]">
          {timeAgo(Date.parse(dateTime))}
        </h2>
      </div>
      <h1>{text}</h1>
      <div>
        {media?.map((m) => (
          <Image
            width={300}
            height={300}
            key={m}
            src={m}
            alt="Tweet media"
            className="
              cursor-pointer
              w-full
              my-2
              h-auto
              rounded-xl
              border-stone-600
              border-[0.7px]
            "
          />
        ))}
      </div>
    </div>
  </div>);
}