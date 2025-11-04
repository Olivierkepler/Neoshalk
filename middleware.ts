import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // redirect here if not logged in
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // protect everything under /dashboard
};
