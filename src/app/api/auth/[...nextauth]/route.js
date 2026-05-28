import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("!!Authorize called with:", credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const client = await clientPromise;
          const db = client.db("auth-demo");
          const usersCollection = db.collection("users");

          const searchEmail = credentials.email.toLowerCase().trim();

          const user = await usersCollection.findOne({ email: searchEmail });

          if (!user) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            nickname: user.nickname,
          };
        } catch (error) {
          console.error("Ошибка авторизации:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    maxAge: 60 * 60 * 24,
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,

  jwt: {
    maxAge: 60 * 60 * 24,
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("!!!JWT callback:", { token, user });
      if (user) {
        token.nickname = user.nickname;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("!!!Session callback:", { session, token });
      if (token && session.user) {
        session.user.nickname = token.nickname;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
