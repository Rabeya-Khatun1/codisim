"use client";

import { Star, PlayCircle, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../buttons/Button";

interface Course {
  _id: string;
  title: string;
  price: number;
  instructor: string;
  rating: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
}

const CourseCard = ({ course }: { course: Course }) => {

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
            {course.level}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
          <Clock size={12} />
          <span>{course.duration}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {renderStars(course.rating)}
          <span className="text-xs text-gray-500 font-medium ml-1">
            ({course.rating})
          </span>
        </div>
        <h3 className="font-bold text-gray-800 text-md mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-500 text-xs mb-4">
          by <span className="font-medium text-gray-700">{course.instructor}</span>
        </p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Price</span>
             <span className="font-black text-blue-600 text-lg">${course.price}</span>
          </div>

          <Link href={`/courses/${course._id}`}>
            <Button className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-blue-200 transition-all active:scale-95">
              <PlayCircle size={16} /> View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;