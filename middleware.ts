// ! Middleware chạy trên server, nên sessionStorage (client-side API) không hoạt động ở đây.
// ! Nếu bạn đã đăng nhập, token phải được lưu trong cookie (hoặc một nơi mà middleware có thể truy cập server-side). Nếu bạn chỉ lưu trong sessionStorage, middleware sẽ không thấy token này.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/favourites(.*)", "/profile(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
