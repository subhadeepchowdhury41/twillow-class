import { create } from 'zustand';

interface EditTweetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditTWeetModal = create<EditTweetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useEditTWeetModal;