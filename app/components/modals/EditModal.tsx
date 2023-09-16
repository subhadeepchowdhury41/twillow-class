'use client';

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import TextInput from "../ui/TextInput";
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "@/services/userServicesClient";
import { useSession } from "next-auth/react";
import Button from "../ui/Button";

const EditModal = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const fetchUserInfo = async () => {
    setIsLoading(true);
    const res = await fetchUser(
      session?.user.id!,
      session?.user.accessToken!
    );
    setName(res.name);
    setBio(res.bio);
    setProfileImage(res.pfp);
    setIsLoading(false);
    // setCoverImage(res.coverImage);
  }

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      }}>Edit Profile</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <TextInput
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
          />
          <TextInput
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={isLoading}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button label="Cancel" outline onClick={() => setOpen(false)} />
        <Button label="Save" onClick={async () => {
          setIsLoading(true);
          await updateUser(
            session?.user.id!,
            name,
            bio,
            profileImage,
            session?.user.accessToken!
          ).then(() => {
            setIsLoading(false);
            setOpen(false);
            window.location.reload();
          })
        }} />
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;