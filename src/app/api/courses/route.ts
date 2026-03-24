"use server"
import { collections, dbConnect } from "@/lib/dbConnect";

export const getCourses = async (page: number = 1, limit: number = 8) => {
  const coursesCollection = await dbConnect(collections.COURSES);

  const skip = (page - 1) * limit;

  const result = await coursesCollection
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
  const courses = result.map(course => ({
    ...course,
    _id: course._id.toString()
  }));
  const total = await coursesCollection.countDocuments();

  return { courses, total };
};