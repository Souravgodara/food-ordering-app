import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import bcrypt from "bcrypt";

import { User } from "../../models/userModel";
import connectDB from "@/lib/connectDB";
import clientPromise from "@/lib/MongoAdapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        try {
          await connectDB();
          const user = await User.findOne({ email });
          const passwordOk =
            user && bcrypt.compareSync(password, user.password);

          if (passwordOk) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log("Error While Logging In ", error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role;
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
