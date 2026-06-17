import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const client = await clientPromise;
          const db = client.db("auth-demo");
          const usersCollection = db.collection("users");

          const email = user.email.toLowerCase().trim();
          let existingUser = await usersCollection.findOne({ email });

          if (!existingUser) {
            const newUser = {
              email,
              nickname: user.name || email.split("@")[0],
              password: null,
              createdAt: new Date(),
            };
            await usersCollection.insertOne(newUser);
            existingUser = newUser;
          }

          user.nickname = existingUser.nickname;
        } catch (err) {
          console.error("Ошибка при Google sign-in:", err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.provider = account.provider;
      }

      if (user) {
        token.nickname = user.nickname;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.nickname = token.nickname;
        session.user.provider = token.provider;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
