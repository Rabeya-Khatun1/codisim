"use client";
import React, { useEffect, useState } from "react";
import { getCourses } from "@/app/api/courses/route";
import { ChevronLeft, ChevronRight, Star, PlayCircle, Clock } from "lucide-react";
import Button from "../buttons/Button";
import Image from "next/image";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  price: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  category: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const fetchCourses = async () => {
    try {
      const res = await getCourses(page, limit); // server function
      setCourses(res.courses);
      setTotalPages(Math.ceil(res.total / limit));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));

  return (
    <section className="pt-32  pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Popular Courses</h2>
            <p className="text-gray-600">Learn latest technologies with industry experts</p>
          </div>
         <Link href={'/courses'}>
          <Button className="text-blue-600 font-bold flex items-center gap-2 group hover:gap-3 transition-all">
            View All 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
          </Button></Link>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-40">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                  <span>{course.duration}</span>
                  <Clock size={14} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(course.rating)}
                  <span className="text-sm text-gray-600 ml-1">({course.rating})</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{course.instructor}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{course.price}</span>
                  <Button className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                    <PlayCircle size={16} /> View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <p
            onClick={() => page > 1 && setPage(page - 1)}
            className={`px-4 py-2 rounded bg-gray-200 text-primary cursor-pointer hover:bg-gray-300 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""} flex items-center gap-1`}
          >
            <ChevronLeft size={18} /> Prev
          </p>
          <span className="px-4 py-2">{page} / {totalPages}</span>
          <p
            onClick={() => page < totalPages && setPage(page + 1)}
            className={`px-4 py-2 rounded bg-gray-200 text-primary cursor-pointer hover:bg-gray-300 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""} flex items-center gap-1`}
          >
            Next <ChevronRight size={18} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Courses;