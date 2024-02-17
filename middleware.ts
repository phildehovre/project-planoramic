import { authMiddleware } from "@clerk/nextjs";
import { apiGoogleRoutePrefix, DEFAULT_DEVELOPMENT_LOGIN_REDIRECT_URL, publicRoutes } from "@/routes";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({

  afterAuth(auth, req, evt) {

    // console.log("auth: ", auth, "req: ", req, "evt: ", evt)
    const {nextUrl} = req
  const isLoggedIn = !!auth;
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutePrefix)
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isApiGoogleRoute = nextUrl.pathname.startsWith(apiGoogleRoutePrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  
  // if (isApiAuthRoute) {
  //   return null;
  // }
  
  if (isApiGoogleRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_DEVELOPMENT_LOGIN_REDIRECT_URL, nextUrl))
    }
    return null;
  }
  
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  
  return null
}
});



export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};