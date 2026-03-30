"use client";
import React from "react";
import { Phone, Mail, Calendar, BadgeCheck, Edit3, Camera, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileShowcase = ({ user }: { user: any }) => {
  
  const getInitials = (name: string) => {
    return name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  };
  const isValidUrl = (url: string) => {
    return url && url.startsWith("http") && url.length > 10;
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen pb-10">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto relative">
          <Link href="/dashboard/profile/settings" className="block relative h-48 md:h-80 w-full bg-gradient-to-r from-slate-200 to-slate-300 rounded-b-xl overflow-hidden group">
            {isValidUrl(user?.cover) ? (
              <Image 
                src={user.cover} 
                alt="Cover" 
                fill 
                className="object-cover" 
                priority // কভার ফটোর জন্য প্রায়োরিটি দেওয়া ভালো
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-indigo-200 to-slate-300 flex items-center justify-center">
                 <p className="text-slate-400 text-sm">No cover photo set</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center">
               <Camera className="text-white opacity-0 group-hover:opacity-100 transition-all" size={30} />
            </div>
          </Link>
          <div className="px-4 md:px-8 pb-4">
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-12 md:-mt-16 mb-4">
              
              {/* Profile Image - ফিক্সড এখানে */}
              <Link href="/dashboard/profile/settings" className="relative group">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white bg-slate-100 shadow-lg overflow-hidden relative">
                  {isValidUrl(user?.image) ? (
                    <Image 
                      src={user.image} 
                      alt="Avatar" 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-500 text-5xl font-bold">
                      {getInitials(user?.name)}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                   <Camera className="text-white" size={24} />
                </div>
              </Link>

              {/* Name & Role */}
              <div className="flex-1 text-center md:text-left mb-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{user?.name}</h1>
                  <BadgeCheck size={28} className="text-blue-500 fill-blue-50" />
                </div>
                <p className="text-slate-500 font-semibold mt-1">
                   {user?.role === "teacher" ? "Instructor" : "Student"} • Member
                </p>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Link href={'/dashboard/profile/settings'}>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95">
                    <Edit3 size={18} /> Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Intro</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="text-slate-400" size={20} />
                  <p>Email: <span className="font-semibold">{user?.email}</span></p>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="text-slate-400" size={20} />
                  <p>Contact: <span className="font-semibold">{user?.phone || "Not set"}</span></p>
                </div>
                {user?.bio && (
                  <div className="flex items-start gap-3 text-slate-700">
                    <Briefcase className="text-slate-400 mt-1" size={20} />
                    <p>{user.bio}</p>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-700">
                  <Calendar className="text-slate-400" size={20} />
                  <p>Joined: <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <p className="text-slate-500 italic">"Welcome to your professional dashboard. Update your profile to stand out!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShowcase;