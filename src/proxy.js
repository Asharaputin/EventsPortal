import { withAuth } from "next-auth/middleware";
import { authConfig } from "./app/api/auth/[...nextauth]/auth.config";

export default withAuth({
  ...authConfig,
});

export const config = {
  matcher: ["/events/:path*", "/change-password"],
};
