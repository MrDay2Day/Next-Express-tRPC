import webpush from "web-push";
export // Store subscriptions (in a real app, use a database)
const subscriptions = new Set<webpush.PushSubscription>();
