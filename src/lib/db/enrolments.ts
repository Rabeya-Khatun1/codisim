"use server"

import { getServerSession } from "next-auth";
import { collections, dbConnect } from "../dbConnect";
import { authOptions } from "../authOptions";

export interface IEnrollment {
  _id?: string;
  courseId: string;
  courseName: string;
  price: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  reason: string;
  question?: string;
  status: "pending" | "approved" | "rejected"; 
  paymentStatus: "unpaid" | "paid" | "partial";
  createdAt: string;
}

interface IServerResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
 const enrollmentCollection = await dbConnect<IEnrollment>(collections.ENROLLMENTS);

export const postEnrollment = async (
  payload: Omit<IEnrollment, "createdAt" | "status" | "paymentStatus">
): Promise<IServerResponse> => {
 

  // Validation
  if (!payload.courseId || !payload.phone || !payload.experience) {
    return { success: false, message: "Required fields are missing" };
  }

  const newEnrollment: IEnrollment = {
    ...payload,
    status: "pending",   
    paymentStatus: "unpaid",
    createdAt: new Date().toISOString(),
  };

  const result = await enrollmentCollection.insertOne(newEnrollment);

  if (!result.acknowledged) {
    return { success: false, message: "Failed to submit enrollment" };
  }

  return {
    success: true,
    message: "Enrollment submitted successfully!",
  };
};

export const getMyEnrollments = async (): Promise<IServerResponse> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return { success: false, message: "Unauthorized", data: [] };
    }

    const enrollmentCollection = await dbConnect<IEnrollment>(collections.ENROLLMENTS);
    const result = await enrollmentCollection
      .find({ email: session.user.email })
      .sort({ createdAt: -1 }) 
      .toArray();
    const plainEnrollments = result.map((item) => ({
      ...item,
      _id: item._id?.toString(),
    }));

    return {
      success: true,
      message: "Data fetched successfully",
      data: plainEnrollments,
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Failed to fetch data", data: [] };
  }
};