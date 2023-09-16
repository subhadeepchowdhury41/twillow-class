/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from "react";

import TextInput from "../ui/TextInput";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../ui/Button";
import { getTweet, updateTweet } from "@/services/tweetServices";
import { useSession } from "next-auth/react";
import { AiFillCloseCircle } from "react-icons/ai";

const EditTweetModal = ({
  tweetId,
  open,
  setOpen
}: {
  tweetId: string,
  open: boolean,
  setOpen: (open: boolean) => void
}) => {
  const { data: session } = useSession();
  const [media, setMedia] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      const tweet = await getTweet(tweetId, session?.user.accessToken!);
      setMedia(tweet.media);
      setText(tweet.text);
    }
    fetchTweet();
  }, []);
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '20px',
          width: '500px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.1)',
          padding: '20px',
        }
      }}
      open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px',
      }}>Edit Tweet</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <TextInput
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            disabled={isLoading}
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
                  <AiFillCloseCircle size={25} />
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
      </DialogContent>
      <DialogActions>
        <Button label="Cancel" outline onClick={() => setOpen(false)} />
        <Button label="Save" onClick={async () => {
          await updateTweet(tweetId, text, media ?? [], session?.user.accessToken!).then(() => {
            window.location.reload();
          });
        }} />
      </DialogActions>
    </Dialog>
  );
}

export default EditTweetModal;