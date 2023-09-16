'use client';

import Button from "../ui/Button";
import { useState } from "react";
import EditModal from "../modals/EditModal";

export default function EditProfileButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <EditModal open={open} setOpen={setOpen} />
      <Button label="Edit Profile" outline onClick={() => setOpen(true)} />
    </div>
  );
}