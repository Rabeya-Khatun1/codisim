"use client";
import React from "react";
import { User, Phone, Mail, Calendar, BadgeCheck, Edit3, Camera, MapPin, Briefcase, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const ProfileShowcase = ({ user }: { user: any }) => {
  
  const getInitials = (name: string) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen pb-10">
      {/* Header Section: Cover & Avatar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Cover Photo */}
          <div className="relative h-48 md:h-80 w-full bg-gradient-to-r from-slate-200 to-slate-300 rounded-b-xl overflow-hidden group">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all cursor-pointer" />
            <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-all">
              <Camera size={18} /> Edit Cover Photo
            </button>
          </div>

          {/* Profile Picture & Info Area */}
          <div className="px-4 md:px-8 pb-4">
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-12 md:-mt-16 mb-4">
              
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white bg-slate-100 shadow-lg overflow-hidden relative">
                  {user?.avatar ? (
                    <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-500 text-5xl font-bold">
                      {getInitials(user?.name)}
                    </div>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-slate-200 hover:bg-slate-300 rounded-full border-2 border-white text-slate-700 shadow-sm transition-all">
                  <Camera size={20} />
                </button>
              </div>

              {/* Name & Basic Stats */}
              <div className="flex-1 text-center md:text-left mb-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                    {user?.name}
                  </h1>
                  <BadgeCheck size={28} className="text-blue-500 fill-blue-50 mt-1" />
                </div>
                <p className="text-slate-500 font-semibold mt-1">
                   {user?.role === "teacher" ? "Instructor" : "Student"} • 1.2k Followers
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-2">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-all active:scale-95">
                  <Edit3 size={18} /> Edit Profile
                </button>
                <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 p-2.5 rounded-lg transition-all">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section: Left Sidebar & Right Info */}
      <div className="max-w-5xl mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">Intro</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <Briefcase className="text-slate-400" size={20} />
                  <p>Certified <strong>{user?.role}</strong> at LMS platform</p>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="text-slate-400" size={20} />
                  <p>Email: <span className="font-semibold">{user?.email}</span></p>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="text-slate-400" size={20} />
                  <p>Contact: <span className="font-semibold">{user?.phone || "Private"}</span></p>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Calendar className="text-slate-400" size={20} />
                  <p>Joined on <strong>{new Date(user?.createdAt).toLocaleDateString()}</strong></p>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="text-slate-400" size={20} />
                  <p>From <strong>Dhaka, Bangladesh</strong></p>
                </div>
              </div>

              <button className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-lg transition-all text-sm">
                Edit Details
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight italic uppercase">Academic Stats</h2>
                <BadgeCheck size={20} className="text-indigo-600" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-2xl font-black text-indigo-700">12</p>
                    <p className="text-xs font-bold text-indigo-600/70 uppercase">Courses Completed</p>
                 </div>
                 <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-2xl font-black text-emerald-700">98%</p>
                    <p className="text-xs font-bold text-emerald-600/70 uppercase">Success Rate</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileShowcase;