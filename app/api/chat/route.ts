// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Chat API removed. Return 404 to indicate endpoint is not available.
export async function POST(request: NextRequest) {
    return NextResponse.json({ error: "Chat endpoint removed" }, { status: 404 });
}

export async function GET() {
    return NextResponse.json({ error: "Chat endpoint removed" }, { status: 404 });
}
