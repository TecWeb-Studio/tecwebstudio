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

interface PushReport {
  total: number;
  sent: number;
  failed: number;
}

export function isPushConfigured(): boolean {
  return Boolean(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);
}

export async function getPushSubscriptionCount(): Promise<number> {
  const result = await turso.execute("SELECT COUNT(*) as count FROM push_subscriptions");
  return Number(result.rows[0]?.count ?? 0);
}

export async function getSubscriptionEndpoints(): Promise<string[]> {
  const result = await turso.execute("SELECT endpoint FROM push_subscriptions");
  return result.rows.map((row) => row.endpoint as string);
}

export async function sendPushToAllWithReport(payload: PushPayload): Promise<PushReport> {
  if (!isPushConfigured()) {
    throw new Error("Missing VAPID configuration");
  }

  const result = await turso.execute("SELECT endpoint, p256dh, auth FROM push_subscriptions");

  let sent = 0;
  let failed = 0;

  const notifications = result.rows.map(async (row) => {
    const subscription = {
      endpoint: row.endpoint as string,
      keys: {
        p256dh: row.p256dh as string,
        auth: row.auth as string,
      },
    };

    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify(payload),
        {
          TTL: 86400,
          urgency: "high",
          topic: payload.tag || "default",
        }
      );
      sent += 1;
    } catch (error: unknown) {
      failed += 1;
      const statusCode = (error as { statusCode?: number })?.statusCode;
      const body = (error as { body?: string })?.body;
      // Remove expired/invalid subscriptions (410 Gone or 404 Not Found)
      if (statusCode === 410 || statusCode === 404) {
        await turso.execute({
          sql: "DELETE FROM push_subscriptions WHERE endpoint = ?",
          args: [subscription.endpoint],
        });
      }
      console.error(
        `Push failed for ${subscription.endpoint}: status=${statusCode} body=${body}`,
        error
      );
    }
  });

  await Promise.allSettled(notifications);

  return {
    total: result.rows.length,
    sent,
    failed,
  };
}

export async function sendPushToAll(payload: PushPayload): Promise<void> {
  await sendPushToAllWithReport(payload);
}
