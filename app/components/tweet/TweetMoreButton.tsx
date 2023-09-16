'use client';

import { Menu, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import EditTweetModal from "../modals/EditTweetModal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export const TweetMoreButton = ({
  tweetId,
  authorId
}: {
  tweetId: string,
  authorId: string
  }) => {
  const [editTweetOpen, setEditTweetOpen] = useState(false);
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <EditTweetModal tweetId={tweetId} open={editTweetOpen } setOpen={() => setEditTweetOpen(false)} />
      <div className="mr-2 text-blue-400 hover:bg-[#725b5b4f] p-2 w-auto
      h-auto cursor-pointer rounded-full"
        aria-controls={open ? 'tweet-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MdMoreHoriz />
      </div>
      <Menu
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'black',
            boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid #4a4e51',
          },
        }}
        id="tweet-menu"
        aria-labelledby="more-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        
        {session?.user.id !== authorId && <MenuItem onClick={handleClose}>Report User</MenuItem>}
        {session?.user.id !== authorId && <MenuItem onClick={handleClose}>Hide this Post</MenuItem>}
        {session?.user.id !== authorId && <MenuItem onClick={handleClose}>Block User</MenuItem>}
        {session?.user.id === authorId && <MenuItem sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }} onClick={() => {
          setEditTweetOpen(true);
          handleClose();
        }}>
          <AiFillEdit/>
          Edit Tweet
        </MenuItem>}
        {session?.user.id === authorId && <MenuItem onClick={handleClose}>
          <AiFillDelete/>
          Delete Tweet
        </MenuItem>}
      </Menu>
    </div>
  );
}