import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";

export interface IReview {
  _id?: string;
  courseId: string;
  userId?: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface IServerResponse {
  success: boolean;
  message: string;
}

// 🔹 Create Review
export const postReview = async (
  payload: IReview
): Promise<IServerResponse> => {
  const reviewCollection = await dbConnect<IReview>(collections.REVIEWS);
  const courseCollection = await dbConnect<any>(collections.COURSES);

  if (!payload.courseId || !payload.rating || !payload.review) {
    return { success: false, message: "Missing fields" };
  }

  const newReview: IReview = {
    ...payload,
    createdAt: new Date().toISOString(),
  };
  const result = await reviewCollection.insertOne(newReview);

  if (!result.acknowledged) {
    return { success: false, message: "Failed to submit review" };
  }

  const reviews = await reviewCollection.find({ courseId: payload.courseId }).toArray();

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;


  await courseCollection.updateOne(
    { _id: payload.courseId },
    {
      $set: {
        rating: Number(avgRating.toFixed(1)),
      },
    }
  );

  return {
    success: true,
    message: "Review submitted successfully",
  };
};