"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  ChevronLeft, 
  Bell,
  Search,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/common/Logo";
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col bg-white border-r border-slate-200 transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 z-50 bg-indigo-600 text-white rounded-full p-1 shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`} />
        </button>
        <div className="h-20 flex items-center px-6 mb-4">
          {!isCollapsed && <Logo />}
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-6 h-6 shrink-0 ${isActive ? "text-indigo-600" : "group-hover:scale-110 transition-transform"}`} />
                {!isCollapsed && (
                  <span className="ml-4 font-medium whitespace-nowrap overflow-hidden">
                    {item.name}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
        {!isCollapsed && (
          <div className="m-4 p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
            <p className="text-xs text-slate-400">Pro Plan</p>
            <p className="text-sm font-semibold mt-1">Upgrade to unlock AI</p>
            <button className="mt-3 w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-xs font-bold rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Search */}
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 group focus-within:ring-2 ring-indigo-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />

            {/* User Avatar + Name + Role */}
            <div className="flex items-center gap-3 cursor-pointer group">
              {session &&(
                <User className="w-9 h-9 text-gray-400 border rounded-full p-1" />
              )}

              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">
                  {session?.user?.name || "Unknown User"}
                </p>
                <p className="text-xs text-slate-500">
                  {session?.user?.role || "Role"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;