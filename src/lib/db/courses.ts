"use server"

import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../dbConnect";

export const getCourses = async (page: number = 1, limit: number = 8) => {
  const coursesCollection = await dbConnect(collections.COURSES);

  const skip = (page - 1) * limit;

  const result = await coursesCollection
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
 const courses = result.map(course => ({
    _id: course._id.toString(),
    title: course.title || "Untitled",
    price: course.price || "$0",
    instructor: course.instructor || "Unknown",
    rating: course.rating || 0,
    students: course.students || 0,
    duration: course.duration || "0h",
    level: course.level || "Beginner",
    image: course.image || "/placeholder.jpg",
    category: course.category || "General",
  }));
  const total = await coursesCollection.countDocuments();

  return { courses, total };
};


export const getSingleCourse = async (id:string)=>{
 
    const query = {_id:new ObjectId(id)}
const coursesCollections = await dbConnect(collections.COURSES)
const result = await coursesCollections.findOne(query)
return result || null

}