/* eslint-disable @typescript-eslint/no-unused-vars */
//worker.js

async function parseData(rawData) {
  let data = {};
  try {
    const tempt = await JSON.parse(rawData.text());
    console.log({ tempt });
    data = { vibrate: [100, 50, 100], ...tempt };
  } catch (error) {
    data = {
      vibrate: [100, 50, 100],
      title: "New Notification",
      body: "You have a new notifications...",
      icon: "https://xyzabc.day2dayja.com/icons/logo_sqr-192.png",
      badge: "https://xyzabc.day2dayja.com/icons/logo_sqr-72.png",
      image: "https://xyzabc.day2dayja.com/icons/logo_sqr-192.png",
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
  }

  return data;
}
self.addEventListener("push", async (event) => {
  console.dir({ type: "push", event: event.data.text() }, { depth: "*" });
  const data = await parseData(event.data);
  event.waitUntil(self.registration.showNotification(data.title, data));
});
self.addEventListener("notificationclick", async (event) => {
  console.dir({ type: "notificationclick", event }, { depth: "*" });
  event.notification.close();
  event.waitUntil(
    clients.openWindow(
      event.notification.data.endPoint ? event.notification.data.endPoint : "/"
    )
  );
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
