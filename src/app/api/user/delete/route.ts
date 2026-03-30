import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const userCollection = await dbConnect(collections.USERS);

    const result = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}