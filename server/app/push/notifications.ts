import express from "express";
import webpush from "web-push";
import { notifyCount, subscriptions, tally } from "./subscriptions";

// types/notification.ts
interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  data?: Record<string, unknown>;
  actions?: Array<{
    action: string;
    title: string;
  }>;
}

const notificationMsg: NotificationPayload = {
  title: "Main Title " + notifyCount,
  body: "This is a message for the title number " + notifyCount,
  icon: "https://xyzabc.day2dayja.com/icons/logo_sqr-192.png",
  badge: "https://xyzabc.day2dayja.com/icons/logo_sqr-72.png",
  image: "https://xyzabc.day2dayja.com/icons/logo_sqr-192.png",
  data: {
    dateOfArrival: new Date().toISOString(),
    primaryKey: notifyCount,
  },
  actions: [
    {
      action: "explore",
      title: "View Details",
    },
    {
      action: "close",
      title: "Close",
    },
  ],
};

const pushRouter = express.Router();

// Generate VAPID keys using web-push
// const vapidKeys = webpush.generateVAPIDKeys();
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

// Subscribe endpoint
pushRouter.post("/subscribe", (req: express.Request, res: express.Response) => {
  const subscription: webpush.PushSubscription = req.body;

  console.log({ subscription });
  subscriptions.add(subscription);
  res.status(201).json({ message: "Subscription added successfully" });
});

// Unsubscribe endpoint
pushRouter.post(
  "/unsubscribe",
  (req: express.Request, res: express.Response) => {
    const subscription = req.body;
    console.log({ subscription });
    subscriptions.delete(subscription);
    res.status(200).json({ message: "Subscription removed successfully" });
  }
);

// Send notification endpoint
pushRouter.post(
  "/send",
  async (req: express.Request, res: express.Response) => {
    const { title, body } = req.body;

    const notifications: {
      status: string;
      subscription: webpush.PushSubscription;
      error?: webpush.WebPushError;
    }[] = [];

    console.log({ title, body, subscriptions });

    for (const subscription of subscriptions) {
      console.log({ subscription });
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify(notificationMsg as NotificationPayload)
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
      } finally {
        tally();
      }
    }

    res.json({ notifications });
  }
);

pushRouter.post("/test", async (req, res) => {
  try {
    // Send a test notification to all subscriptions
    const pushArray: Promise<webpush.SendResult>[] = [];
    for (const subscription of subscriptions) {
      pushArray.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: "Test Notification",
            body:
              "This is a test notification sent at " +
              new Date().toLocaleTimeString(),
          })
        )
      );
    }
    const results = await Promise.all(pushArray);

    res.json({ success: true, results });
  } catch (error) {
    console.error("Failed to send test notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

export default pushRouter;
