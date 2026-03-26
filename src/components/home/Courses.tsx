"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ListFilter,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import Button from "../buttons/Button";
import Link from "next/link";
import CourseSkeleton from "../skeletons/CourseDetailsSkeletons";
import { getCourses } from "@/lib/db/courses";
import CourseCard from "../cards/CourseCard";

interface CoursesProps {
  showPagination?: boolean;
  showHeader?: boolean;
  showFilter?: boolean;
  title?: string;
}

interface Course {
  _id: string;
  title: string;
  price: number;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  category: string;
}

const Courses = ({
  showPagination = true,
  showHeader = true,
  showFilter = false,
  title = "Popular Courses",
}: CoursesProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 8;

  // Fetch
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await getCourses(page, limit);
      setCourses(res.courses);
      setTotalPages(Math.ceil(res.total / limit));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);

  // Filter + Sort
  const finalCourses = useMemo(() => {
    return [...courses]
      .filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((c) => (category ? c.category === category : true))
      .filter((c) => (level ? c.level === level : true))
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating-high") return b.rating - a.rating;
        return 0;
      });
  }, [courses, search, category, level, sortBy]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 Header */}
        {showHeader && (
          <div className="relative mb-14">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-3xl blur-2xl opacity-60"></div>

            <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 p-6 rounded-3xl border bg-white/60 backdrop-blur-lg shadow-sm">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {title}
                </h2>
                <p className="text-gray-500 text-sm">
                  Curated courses designed to elevate your skills
                </p>
              </div>

              <Link href="/courses">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-all flex items-center gap-2">
                  View All
                  <ChevronRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* 🔥 Filter */}
        {showFilter && (
          <>
            <div className="sticky top-20 z-10 mb-6">
              <div className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md rounded-2xl px-4 py-3 flex flex-wrap gap-3 items-center">

                {/* Search */}
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 border px-3 py-2 rounded-xl text-sm">
                  <ListFilter size={16} />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="">Category</option>
                    <option value="Web Dev">Web Dev</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                {/* Level */}
                <div className="flex items-center gap-2 border px-3 py-2 rounded-xl text-sm">
                  <SlidersHorizontal size={16} />
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 border px-3 py-2 rounded-xl text-sm">
                  <ArrowUpDown size={16} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="">Sort</option>
                    <option value="price-low">Price ↑</option>
                    <option value="price-high">Price ↓</option>
                    <option value="rating-high">Rating</option>
                  </select>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setLevel("");
                    setSortBy("");
                  }}
                  className="ml-auto flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {category && (
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                  {category}
                </span>
              )}
              {level && (
                <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                  {level}
                </span>
              )}
              {search && (
                <span className="px-3 py-1 text-xs bg-gray-200 rounded-full">
                  {search}
                </span>
              )}
            </div>
          </>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : finalCourses.map((course) => (
                <div
                  key={course._id}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl"
                >
                  <CourseCard course={course} />
                </div>
              ))}
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex justify-center items-center gap-2 mt-12">

            <button
              onClick={() => page > 1 && setPage(page - 1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              disabled={page === 1}
            >
              <ChevronLeft size={18} />
            </button>

            <span className="px-4 py-1 text-sm bg-black text-white rounded-full">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              disabled={page === totalPages}
            >
              <ChevronRight size={18} />
            </button>

          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;