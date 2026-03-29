import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the context with params as a Promise
type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    // Await the params before destructuring
    const { id } = await params; 
    
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);
    
    const result = await notificationCollection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { isRead: true } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Already read or not found" });
    }
  } catch (error) {
    console.error("Patch Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}