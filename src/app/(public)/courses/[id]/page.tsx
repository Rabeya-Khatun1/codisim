import { getSingleCourse } from "@/lib/db/courses";
import CourseClient from "./CourseClient";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const {id} = await params;
  const course = await getSingleCourse(id);

  if (!course) return <div>Course not found</div>;
   const safeCourse = {
    _id: course._id.toString(),  
    title: course.title,
    price: course.price,
    instructor: course.instructor,
    rating: course.rating,
    students: course.students,
    duration: course.duration,
    level: course.level,
    image: course.image,
    category: course.category,
  };

  return <CourseClient course={safeCourse} />;
}