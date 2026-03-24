import { NextRequest, NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { sendPushToAll } from "@/lib/push";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await turso.execute({
      sql: "INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)",
      args: [name.trim(), email.trim(), message.trim()],
    });

    // Send push notification to all subscribed admin devices
    sendPushToAll({
      title: "Nuovo Ticket",
      body: `Da ${name.trim()}: ${message.trim().substring(0, 100)}`,
      tag: "new-ticket",
      url: "/admin/dashboard",
    }).catch((err) => console.error("Push notification error:", err));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
