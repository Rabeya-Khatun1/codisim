import { postReview } from "@/lib/db/reviews";
import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await postReview(body);

  return NextResponse.json(result);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json({ success: false, message: "No courseId" });
  }

  const reviewCollection = await dbConnect(collections.REVIEWS);

  const reviews = await reviewCollection
    .find({ courseId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({
    success: true,
    reviews,
  });
}