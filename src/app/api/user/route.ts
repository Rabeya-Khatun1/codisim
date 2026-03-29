import { dbConnect, collections } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, phone } = await req.json();
    const userCollection = await dbConnect(collections.USERS);

    const result = await userCollection.updateOne(
      { email: session.user.email },
      { $set: { name, phone } }
    );

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      return NextResponse.json({ success: true, message: "Profile updated" });
    }

    return NextResponse.json({ success: false, message: "No changes made" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}