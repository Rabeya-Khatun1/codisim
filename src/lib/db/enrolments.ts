"use server"

import { getServerSession } from "next-auth";
import { collections, dbConnect } from "../dbConnect";
import { authOptions } from "../authOptions";
import { ObjectId } from "mongodb";

export interface IEnrollment {
  _id?: string | ObjectId;
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

export const getEnrollments = async () => {
  try {
    const result = await enrollmentCollection
      .find({})
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Failed to fetch enrollments",
    };
  }
};


type UpdateEnrollmentResponse = {
  success: boolean;
  message: string;
};


export const updateEnrollmentStatus = async (
  id: string,
  newStatus: "pending" | "approved" | "rejected"
): Promise<UpdateEnrollmentResponse> => {
  try {
    const enrollmentCollection = await dbConnect<IEnrollment>(collections.ENROLLMENTS);
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS); 
    const enrollment = await enrollmentCollection.findOne({ _id: new ObjectId(id) });
    
    if (!enrollment) {
      return { success: false, message: "Enrollment not found" };
    }

    const result = await enrollmentCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus } }
    );

    if (result.modifiedCount > 0) {
      if (newStatus === "approved") {
        await notificationCollection.insertOne({
          userId: enrollment.email,
          message: `Congratulations! Your enrollment for ${enrollment.courseName} has been approved. Please complete your payment.`,
          type: "APPROVAL",
          isRead: false,
          link: "/dashboard/student/my-enrollments", 
          createdAt: new Date().toISOString(),
        });
      }

      return {
        success: true,
        message: `Enrollment has been ${newStatus} successfully!`,
      };
    }

    return { success: false, message: "No changes were made." };
  } catch (error: unknown) {
return { success: false, message: "No changes were made." };  
  }
};