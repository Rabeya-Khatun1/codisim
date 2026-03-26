import { BookOpen, Star, Users } from 'lucide-react';
import React from 'react';

const FeaturedCourses = () => {

      const courses = [
    { title: "Web Development Bootcamp", students: "3,421", rating: "4.9", level: "Beginner", price: "Free" },
    { title: "Data Science Masterclass", students: "2,156", rating: "4.8", level: "Intermediate", price: "$49" },
    { title: "UI/UX Design Fundamentals", students: "1,892", rating: "4.9", level: "Beginner", price: "Free" },
    { title: "Digital Marketing Pro", students: "2,734", rating: "4.7", level: "All Levels", price: "$39" },
  ]

  
    return (
            <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h4 className="text-[#FFC570] font-bold tracking-widest uppercase text-sm mb-3">Popular Courses</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Start Learning With <span className="text-[#FFC570]">Top-Rated Courses</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from hundreds of courses taught by industry experts and start your learning journey today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-[#FFC570]/20 to-[#FFC570]/10 flex items-center justify-center">
                  <BookOpen size={48} className="text-[#FFC570]" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#FFC570] bg-[#FFC570]/10 px-2 py-1 rounded-full">{course.level}</span>
                    <span className="text-sm font-bold text-slate-900">{course.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#FFC570] transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-[#FFC570] text-[#FFC570]" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default FeaturedCourses;