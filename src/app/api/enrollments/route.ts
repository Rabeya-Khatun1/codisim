// /api/enrollments/route.ts

import { NextResponse } from "next/server";
import { getEnrollments } from "@/lib/db/enrolments";

export async function GET() {
  const result = await getEnrollments();
  return NextResponse.json(result);
}