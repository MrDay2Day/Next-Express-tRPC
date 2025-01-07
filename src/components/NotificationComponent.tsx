/* eslint-disable react-hooks/exhaustive-deps */
import { trpcClient } from "@/utils/trpc/trpcClientSide";
import { useState, useEffect } from "react";

const NotificationComponent = () => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [notificationPermission, setNotificationPermission] =
    useState("default");

  useEffect(() => {
    // Check if service workers are supported
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
      checkNotificationPermission();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const reg = await navigator.serviceWorker.register("/worker.js");
      console.log("SW registered:", registration);
      setRegistration(reg);

      // Get existing subscription if any
      const existingSubscription = await reg.pushManager.getSubscription();
      setSubscription(existingSubscription);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  };

  const checkNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const subscribeToNotifications = async () => {
    try {
      // Generate VAPID keys using web-push on your server
      const publicVapidKey =
        "BNrMNJHclFBLXjXjXp5OOcM416eqAh_Inr8u_9eDQ0-SSQ7axedvuLKHX6kaEPtx9Zm8dpJecr56yj_W1KjMJWI";

      if (!registration) {
        console.error("Service Worker registration is null");
        return;
      }
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      console.log("Push Subscription:", pushSubscription);

      setSubscription(pushSubscription);

      const mappedSubscription = {
        endpoint: pushSubscription.endpoint,
        expirationTime: pushSubscription.expirationTime,
        keys: {
          p256dh: pushSubscription.toJSON().keys?.p256dh || "",
          auth: pushSubscription.toJSON().keys?.auth || "",
        },
      };

      const response = await trpcClient.PushNotifications.subscribe.mutate(
        mappedSubscription
      );

      console.log("Subscribed to push status: ", response);
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);

      const mappedSubscription = {
        endpoint: subscription?.endpoint || "",
        expirationTime: subscription?.expirationTime || 0,
        keys: {
          p256dh: subscription?.toJSON().keys?.p256dh || "",
          auth: subscription?.toJSON().keys?.auth || "",
        },
      };

      const response = await trpcClient.PushNotifications.subscribe.mutate(
        mappedSubscription
      );

      console.log("UnSubscribed to push status: ", response);
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications:", error);
    }
  };

  const sendPushNotification = async () => {
    try {
      const response = await trpcClient.PushNotifications.send.mutate({
        title: `Testing Push ${Date.now()}`,
        body: `This is the body at ${new Date().toISOString()}`,
      });
      console.log("Push send status: ", response);
    } catch (error) {
      console.error("Failed to send push notifications:", error);
    }
  };

  // Helper function to convert VAPID key
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Push Notifications</h2>

      {notificationPermission === "default" && (
        <button
          onClick={checkNotificationPermission}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Enable Notifications
        </button>
      )}

      {notificationPermission === "granted" && !subscription && (
        <button
          onClick={subscribeToNotifications}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Subscribe to Notifications
        </button>
      )}

      {subscription && (
        <button
          onClick={unsubscribeFromNotifications}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Unsubscribe from Notifications
        </button>
      )}

      {subscription && (
        <button
          onClick={sendPushNotification}
          className="bg-amber-500 text-white px-4 py-2 rounded"
        >
          Send Push
        </button>
      )}
    </div>
  );
};

export default NotificationComponent;
