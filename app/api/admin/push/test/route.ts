import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  getPushSubscriptionCount,
  isPushConfigured,
  sendPushToAllWithReport,
} from "@/lib/push";

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

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!isPushConfigured()) {
      return NextResponse.json(
        {
          error: "Push non configurato: mancano NEXT_PUBLIC_VAPID_PUBLIC_KEY o VAPID_PRIVATE_KEY",
        },
        { status: 500 }
      );
    }

    const subscriptionCount = await getPushSubscriptionCount();
    if (subscriptionCount === 0) {
      return NextResponse.json(
        {
          error:
            "Nessuna sottoscrizione push trovata. Abilita le notifiche da un dispositivo prima del test.",
        },
        { status: 400 }
      );
    }

    const report = await sendPushToAllWithReport({
      title: "Test Notifica Admin",
      body: "Questa e una notifica push di test dal pannello admin.",
      tag: "admin-test-push",
      url: "/admin/dashboard",
    });

    return NextResponse.json({
      success: true,
      message: `Test inviato. Totale: ${report.total}, Inviate: ${report.sent}, Fallite: ${report.failed}`,
      report,
    });
  } catch (error) {
    console.error("Push test error:", error);
    return NextResponse.json(
      {
        error: "Errore durante il test push. Controlla VAPID, endpoint e service worker.",
      },
      { status: 500 }
    );
  }
}
