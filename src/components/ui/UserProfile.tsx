"use client";

import React, { useState } from 'react';
import { User, LogOut, LayoutDashboard, ChevronDown, Bell } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import NotificationBell from './NotificationBell'; 

const UserProfile = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const role = session?.user?.role || "Student";

  return (
    <div className="flex items-center gap-4">
      <NotificationBell userEmail={session?.user?.email || ""} />
      <div className="h-6 w-[1px] bg-gray-200 hidden sm:block mx-1" />

      {/* 3. User Dropdown */}
      <div className="relative">
        <div 
          className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-gray-50 rounded-full transition-all"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Avatar Area */}
          <div className="w-10 h-10 rounded-full border-2 border-indigo-50 overflow-hidden bg-indigo-50 flex items-center justify-center transition-transform group-hover:scale-105">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="User" width={40} height={40} className="object-cover" />
            ) : (
              <User size={20} className="text-indigo-600" />
            )}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-gray-800 leading-tight">
              {session?.user?.name?.split(' ')[0]} {/* Shudhu First Name dekhabe */}
            </p>
            <div className="flex items-center gap-1">
               <span className="text-[9px] uppercase tracking-tighter font-black text-indigo-500 bg-indigo-50 px-1 rounded">
                {role}
              </span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
            
            <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 z-20 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                <p className="text-sm font-bold text-gray-800 truncate">{session?.user?.email}</p>
              </div>

              <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)}>
                <div className="flex items-center gap-3 p-3 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-xl transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="text-sm font-bold">My Dashboard</span>
                </div>
              </Link>

              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 p-3 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-colors mt-1"
              >
                <LogOut size={18} />
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;