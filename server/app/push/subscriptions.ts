import webpush from "web-push";
export const subscriptions = new Set<webpush.PushSubscription>(); // Store subscriptions (in a real app, use a database)
export let notifyCount = 100001;
export const tally = () => notifyCount++;
