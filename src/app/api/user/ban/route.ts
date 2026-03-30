import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    const userCollection = await dbConnect(collections.USERS);

    const user = await userCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const newStatus = !user.isBanned;

    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isBanned: newStatus } }
    );

    return NextResponse.json({
      success: true,
      isBanned: newStatus,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}