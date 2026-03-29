export const dynamic = 'force-dynamic';
import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const unreadOnly = searchParams.get("unread") === "true";

  const notificationCollection = await dbConnect(collections.NOTIFICATIONS);
  
  const query = unreadOnly ? { userId: email, isRead: false } : { userId: email };
  
  const notifications = await notificationCollection.find(query).sort({ createdAt: -1 }).toArray();
  const count = await notificationCollection.countDocuments({ userId: email, isRead: false });

  return NextResponse.json({ success: true, data: notifications, count });
}