'use client';

import Image from "next/image";
import Button from "./components/ui/Button";
import useLoginModal from "./hooks/useLoginModal";
import useRegisterModal from "./hooks/useRegisterModal";

export default function Home() {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <div className="h-screen bg-black text-white grid grid-cols-1 sm:grid-cols-2">
      <div className="flex justify-center items-center w-60 h-60 sm:w-full sm:h-full">
        <Image src="/images/Twitter-X.png" width={500} height={500} alt="Twitter-X Logo" />
      </div>
      <div className="flex flex-col p-4 md:items-start m-8 justify-around">
        <div className="font-extrabold text-5xl mb-6 sm:text-6xl sm:mb-0 sm:px-0">
          Happening Now
        </div>
        <div className="">
          <div className="font-bold text-4xl">
            Join today.
          </div>
          <div className="w-72 mt-8">
            <Button fullWidth onClick={registerModal.onOpen} label="Create Account" />
          </div>
        </div>
        <div>
          <div className="font-bold text-xl">
            Already have an account?
          </div>
          <div className="w-72 mt-6">
            <Button fullWidth outline onClick={loginModal.onOpen} label="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}
