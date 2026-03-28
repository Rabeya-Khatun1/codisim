"use client";

import { BookOpen, Users, PlusCircle, ArrowRight, GraduationCap, LayoutGrid } from "lucide-react";

export default function TeacherDashboard() {
  const stats = [
    { label: "Total Courses", value: "8", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Students", value: "120", icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Teacher Portal</h1>
          <p className="text-slate-500 font-medium">Manage your curriculum and track student progress.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl transition-all active:scale-95 shadow-xl shadow-slate-200">
          <PlusCircle size={20} />
          <span className="font-semibold">Create New Course</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h2 className="text-2xl font-bold text-slate-800">{stat.value}</h2>
            </div>
          </div>
        ))}
        
        {/* Quick Action Card */}
        <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-100 flex flex-col justify-center text-white relative overflow-hidden group cursor-pointer">
           <LayoutGrid className="absolute -right-4 -top-4 opacity-20 group-hover:rotate-12 transition-transform" size={100} />
           <p className="text-indigo-100 text-sm font-medium">Resources</p>
           <h2 className="text-xl font-bold">Teaching Materials</h2>
        </div>
      </div>

      {/* Course List Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="text-indigo-500" />
            Active Courses
          </h2>
          <button className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
        </div>

        <div className="grid gap-4">
          {[1, 2].map((c) => (
            <div key={c} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Advanced Web Development</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">Batch #04</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users size={12} /> 30 Students
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right mr-4">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Progress</p>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[65%]" />
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-slate-100 hover:border-indigo-100">
                  Manage <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}