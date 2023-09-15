import { signInWithUsernameAndPassword } from "@/services/authServices";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "example"
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const response = await signInWithUsernameAndPassword(
          credentials!.username,
          credentials!.password
        );
        console.log("============>",response);
        return {...credentials, ...response};
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // console.log('JWT ===============>', token, user);
      return { ...token, ...user }
    },
    session: async ({ session, token, user }) => {
      // console.log('SESSION ===============>', session, token, user);
      session.user = token as any;
      return session;
    }
  }
};