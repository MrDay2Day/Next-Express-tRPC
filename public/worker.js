/* eslint-disable @typescript-eslint/no-unused-vars */
//worker.js
self.addEventListener("push", (event) => {
  console.log({ event });
  const options = {
    body: event.data.text(),
    icon: "/icons/logo-192x192.png",
    badge: "/icons/logo-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
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

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event.notification.data);

  // Handle notification click event, like focusing the app or navigating to a page
  event.notification.close();

  // Here you can send data back to the main thread (React app)
  event.waitUntil(
    clients.openWindow("/") // Open the main page when notification is clicked
  );
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
