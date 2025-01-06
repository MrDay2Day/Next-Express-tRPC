import webpush from "web-push";
import z from "zod";
import { publicProcedure, router } from "../config";
import { subscriptions } from "../../push/subscriptions";

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, unknown>;
  actions?: Array<{
    action: string;
    title: string;
  }>;
}

const vapidKeys = {
  publicKey:
    "BNrMNJHclFBLXjXjXp5OOcM416eqAh_Inr8u_9eDQ0-SSQ7axedvuLKHX6kaEPtx9Zm8dpJecr56yj_W1KjMJWI",
  privateKey: "AlpBwvrr9Y46TTr3oJKpV5EU4H2K-4V592obe5WSwuQ",
};

console.log({ vapidKeys });

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptionData = z.custom<webpush.PushSubscription>();
const messageData = z.object({
  title: z.string(),
  body: z.string(),
});

const PushNotifications = router({
  subscribe: publicProcedure
    .input(subscriptionData)
    .mutation(async ({ input }) => {
      subscriptions.add(input);
      return { message: "Subscription added successfully" };
    }),
  unsubscribe: publicProcedure
    .input(subscriptionData)
    .mutation(async ({ input }) => {
      subscriptions.delete(input);
      return { message: "Subscription removed successfully" };
    }),
  send: publicProcedure.input(messageData).mutation(async ({ input }) => {
    const notifications: {
      status: string;
      subscription: webpush.PushSubscription;
      error?: webpush.WebPushError;
    }[] = [];

    console.log({ title: input.title, body: input.body, subscriptions });

    for (const subscription of subscriptions) {
      console.log({ subscription });
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: input.title,
            body: input.body,
          } as NotificationPayload)
        );
        notifications.push({ status: "success", subscription });
      } catch (error: unknown | webpush.WebPushError | Error) {
        notifications.push({
          status: "failed",
          subscription,
          error: error as webpush.WebPushError,
        });
        // Remove invalid subscriptions
        if (error && (error as webpush.WebPushError).statusCode === 410) {
          subscriptions.delete(subscription);
        }
      }

      return { notifications };
    }
  }),
});

export default PushNotifications;
