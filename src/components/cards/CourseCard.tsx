"use client";

import { Star, PlayCircle, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../buttons/Button";

interface Course {
  _id: string;
  title: string;
  price: string;
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
        size={16}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-40">
        <Image
          src={course.image}
          alt={course.title}
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {course.level}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
          <span>{course.duration}</span>
          <Clock size={14} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {renderStars(course.rating)}
          <span className="text-sm text-gray-600 ml-1">
            ({course.rating})
          </span>
        </div>

        <h3 className="font-bold text-lg mb-1">{course.title}</h3>
        <p className="text-gray-500 text-sm mb-2">
          {course.instructor}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-bold">{course.price}</span>

          <Link href={`/courses/${course._id}`}>
            <Button className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
              <PlayCircle size={16} /> View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;