import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
  const { id } = params;
  const { status } = await req.json(); 
const enrollmentCollection = await dbConnect(collections.ENROLLMENTS)
  await enrollmentCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );

  return NextResponse.json({ success: true });
}