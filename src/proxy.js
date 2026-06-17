import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("Middleware running for path:", req.nextUrl.pathname);
  },
  {
    pages: {
      signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
);

export const config = {
  matcher: ["/", "/events/:path*", "/change-password"],
};
