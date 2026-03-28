"use client";

import { BookOpen, User, BarChart3, PlayCircle, Trophy, Clock, ArrowRight } from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    { label: "Enrolled", value: "05", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Avg. Progress", value: "72%", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Certificates", value: "02", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const courses = [
    { name: "Fullstack Next.js Mastery", progress: 75, instructor: "Anisul Islam", lastLesson: "Server Actions" },
    { name: "UI/UX Design Essentials", progress: 40, instructor: "Tanvir Ahmed", lastLesson: "Figma Components" },
  ];

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-screen space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-white">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl border-4 border-indigo-50">
            JD
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Hi, John Doe! 👋</h1>
            <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
              <Clock size={14} /> Ready to continue your learning journey?
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <User size={18} />
          <span className="font-semibold text-sm">Edit Profile</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">{stat.label}</p>
              <h2 className="text-3xl font-black text-slate-800">{stat.value}</h2>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Course Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-slate-800">Continue Learning</h2>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Browse All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                  <PlayCircle className="text-slate-400 group-hover:text-indigo-500" size={32} />
                </div>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase">
                  {course.progress}% Completed
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{course.name}</h3>
              <p className="text-xs text-slate-400 font-medium mb-6">Last: {course.lastLesson}</p>

              {/* Custom Progress Bar */}
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
                  <div 
                    style={{ width: `${course.progress}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 rounded-full transition-all duration-1000"
                  />
                </div>
              </div>

              <button className="w-full bg-slate-50 text-slate-700 font-bold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                Resume Lesson
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}