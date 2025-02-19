/**
 * Main Routes for tRPC Server
 */

import { callerFactory, router } from "./config";
import CookieManagement from "./routes/CookieManagement/main";
import PushNotifications from "./routes/NotificationManagement/main";
import UserManagement from "./routes/UserManagement/main";

// Create the router with two routes
export const appRouter = router({
  UserManagement,
  CookieManagement,
  PushNotifications,
});

// Caller to use ExpressAPI tRPC functions on the server
export const createCaller = callerFactory(appRouter);
// Export type router type signature
export type AppRouter = typeof appRouter;
