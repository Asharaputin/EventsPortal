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
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("👉 Ошибка: Не переданы email или пароль");
            return null;
          }

          const client = await clientPromise;
          const db = client.db("auth-demo"); // Убедитесь, что имя базы совпадает со строкой в Atlas!
          const usersCollection = db.collection("users");

          // Принудительно приводим email к нижнему регистру, если в базе он так сохранен
          const searchEmail = credentials.email.toLowerCase().trim();
          console.log("👉 Ищем пользователя с email:", searchEmail);

          const user = await usersCollection.findOne({ email: searchEmail });

          if (!user) {
            console.log("❌ Пользователь в базе данных НЕ найден");
            return null;
          }
          console.log("✅ Пользователь найден в БД, проверяем пароль...");

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValid) {
            console.log("❌ Пароль НЕ совпал");
            return null;
          }

          console.log("🎉 Авторизация успешна для:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || "User",
          };
        } catch (error) {
          console.error("🚨 КРИТИЧЕСКАЯ ОШИБКА В AUTHORIZE:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,

  debug: process.env.NODE_ENV === "development" || true,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
