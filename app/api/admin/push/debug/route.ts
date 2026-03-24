import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { turso } from "@/lib/turso";
import { isPushConfigured } from "@/lib/push";

const JWT_SECRET = process.env.JWT_SECRET || "tecweb-fallback-secret-change-me";

function verifyAdmin(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const vapidConfigured = isPushConfigured();
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ? `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY.substring(0, 10)}...`
      : "MISSING";
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY ? "SET" : "MISSING";
    const vapidSubject = process.env.VAPID_SUBJECT || "mailto:info@tecwebstudio.com";

    const result = await turso.execute(
      "SELECT id, endpoint, substr(p256dh, 1, 20) as p256dh_prefix, created_at FROM push_subscriptions ORDER BY created_at DESC"
    );

    const subscriptions = result.rows.map((row) => {
      const endpoint = row.endpoint as string;
      let provider = "Unknown";
      if (endpoint.includes("web.push.apple.com")) provider = "Apple (iOS/macOS)";
      else if (endpoint.includes("fcm.googleapis.com")) provider = "Google (Chrome/Android)";
      else if (endpoint.includes("mozilla.com")) provider = "Mozilla (Firefox)";
      else if (endpoint.includes("notify.windows.com")) provider = "Microsoft (Edge)";

      return {
        id: row.id,
        provider,
        endpoint_prefix: endpoint.substring(0, 60) + "...",
        p256dh_prefix: row.p256dh_prefix,
        created_at: row.created_at,
      };
    });

    return NextResponse.json({
      vapid: {
        configured: vapidConfigured,
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey,
        subject: vapidSubject,
      },
      subscriptions: {
        count: subscriptions.length,
        list: subscriptions,
      },
      hints: {
        ios: "Su iOS le push funzionano SOLO se: 1) L'app è aggiunta alla Home Screen, 2) È aperta in modalità standalone, 3) Il permesso notifiche è stato concesso, 4) iOS 16.4+",
        debug: "Se 'Apple' non appare nei provider, il dispositivo iOS non ha completato la subscription push.",
      },
    });
  } catch (error) {
    console.error("Push debug error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
