import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
console.log("Middleware executed with secret:", process.env.NEXTAUTH_SECRET);
console.log("Middleware running for path:", req.nextUrl.pathname);
export const config = {
  matcher: ["/", "/events/:path*", "/change-password"],
};
