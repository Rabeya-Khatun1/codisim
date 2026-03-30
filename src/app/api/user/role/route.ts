import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req: Request) {
  const { id, role } = await req.json();

  const users = await dbConnect(collections.USERS);

  await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role } }
  );

  return NextResponse.json({ success: true });
}