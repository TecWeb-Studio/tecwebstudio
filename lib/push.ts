import webpush from "web-push";
import { turso } from "./turso";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:info@tecwebstudio.com";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

interface PushPayload {
  title: string;
  body: string;
  tag?: string;
  url?: string;
}

export async function sendPushToAll(payload: PushPayload): Promise<void> {
  const result = await turso.execute("SELECT endpoint, p256dh, auth FROM push_subscriptions");

  const notifications = result.rows.map(async (row) => {
    const subscription = {
      endpoint: row.endpoint as string,
      keys: {
        p256dh: row.p256dh as string,
        auth: row.auth as string,
      },
    };

    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
    } catch (error: unknown) {
      const statusCode = (error as { statusCode?: number })?.statusCode;
      // Remove expired/invalid subscriptions (410 Gone or 404 Not Found)
      if (statusCode === 410 || statusCode === 404) {
        await turso.execute({
          sql: "DELETE FROM push_subscriptions WHERE endpoint = ?",
          args: [subscription.endpoint],
        });
      }
      console.error(`Push failed for ${subscription.endpoint}:`, error);
    }
  });

  await Promise.allSettled(notifications);
}
