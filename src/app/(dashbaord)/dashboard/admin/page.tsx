"use client";

import { Users, BookOpen, ShieldCheck, ArrowUpRight, Plus } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "500", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Courses", value: "45", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "System Admins", value: "3", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Overview</h1>
          <p className="text-gray-500">Welcome back, here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-200">
          <Plus size={18} />
          <span>New Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform`}>
              <stat.icon size={80} />
            </div>
            <div className="relative z-10">
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-gray-500 font-medium">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
                <span className="text-emerald-500 text-xs font-bold flex items-center">
                  <ArrowUpRight size={12} /> +12%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Management Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-1 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">User Directory</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Manage your community, monitor activity, and handle permissions or restrictions.
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="mt-6 flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">+496</div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 p-6 rounded-3xl shadow-xl shadow-indigo-100 relative overflow-hidden group cursor-pointer">
           <div className="absolute -right-4 -bottom-4 text-indigo-800 opacity-20 group-hover:scale-110 transition-transform">
              <BookOpen size={120} />
           </div>
           <h2 className="text-xl font-bold text-white mb-1">Course Catalog</h2>
           <p className="text-indigo-200 text-sm mb-6 max-w-[200px]">
             Review pending submissions and curate the best learning content.
           </p>
           <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-md transition-colors border border-white/20">
             Manage Courses
           </button>
        </div>
      </div>
    </div>
  );
}