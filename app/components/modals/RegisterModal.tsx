'use client';

import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import TextInput from "../ui/TextInput";
import Modal from "../ui/Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { getClientSideClient } from "@/lib/apollo-csclient";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $name: String!) {
    createUser(username: $username, password: $password, email: $email, name: $name) {
      _id
    }
  }
`;

const signUp = async (
  username: string,
  password: string,
  email: string,
  name: string
) => {
  console.log('SIGINING UP================>');

  const client = getClientSideClient();
  const { data, errors } = await client.mutate({
    mutation: CREATE_USER,
    variables: {
      username,
      password,
      email,
      name
    },
  });
  console.log(errors, data);

  console.log('SIGNED UP!!!!!!!!!!!!!!');

  return data;
};

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    console.log('SUBMITTING');

    try {
      setIsLoading(true);
      await signUp(username, password, email, name).then(async (res) => {
        await signIn('credentials', {
          username,
          password,
          callbackUrl: '/home',
        });
      });
      toast.success('Account created.');
      registerModal.onClose();
      redirect('/home');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <TextInput
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        > Sign in</span>
      </p>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;