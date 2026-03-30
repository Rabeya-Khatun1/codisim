import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Next.js 15+ e params await korte hoy
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    const enrollmentCollection = await dbConnect(collections.ENROLLMENTS);
    const enrollment = await enrollmentCollection.findOne({ _id: new ObjectId(id) });

    if (!enrollment) {
      return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        // DB te field name jeta ache oita check koro (e.g. courseTitle naki courseName)
        courseName: enrollment.courseName || enrollment.courseTitle || "Premium Course",
        studentEmail: enrollment.studentEmail || enrollment.email || "student@example.com"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

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