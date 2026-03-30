"use client";

import React, { useState, useMemo } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  ChevronLeft, 
  Bell,
  Search,
  User,
  GraduationCap,
  CreditCard,
  ReceiptText,
  WalletCards,
  LayoutGrid,
  Settings2Icon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";
import { useSession } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import NotificationBell from "@/components/ui/NotificationBell";
import UserProfile from "@/components/ui/UserProfile";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { role, isLoading } = useRole();

  const navItems = useMemo(() => {
    const items = [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    ];

    if (role === "admin") {

      items.push(
  { 
    name: "Enrollments", 
    href: "/dashboard/admin/enrollments", 
    icon: GraduationCap 
  },
  { 
    name: "Users Management", 
    href: "/dashboard/admin/users", 
    icon: Users 
  },
  { 
    name: "Course Management", 
    href: "/dashboard/admin/course-management", 
    icon: BookOpen 
  },
  { 
    name: "Category Management", 
    href: "/dashboard/admin/category-manager", 
    icon: LayoutGrid 
  },
  { 
    name: "Payout Requests", 
    href: "/dashboard/admin/payout-requests", 
    icon: WalletCards 
  },
  { 
    name: "Transaction History", 
    href: "/dashboard/admin/transaction-history", 
    icon: ReceiptText 
  },
  { 
    name: "Privacy Settings", 
    href: "/dashboard/admin/privacy-settings", 
    icon: Settings2Icon
  }
);
    } else if(role === "teacher"){
  items.push(
        { name: "My Courses", href: "/dashboard/student/my-courses", icon: GraduationCap },
        { name: "Student Payments", href: "/dashboard/student/student-payments", icon: CreditCard }
      );
    } else {
      items.push(
        { name: "My Enrollments", href: "/dashboard/student/my-enrollments", icon: GraduationCap },
        { name: "My Payments", href: "/dashboard/student/my-payments", icon: CreditCard }
      );
    }
    items.push({ name: "Settings", href: "/dashboard/profile", icon: Settings });
    
    return items;
  }, [role]);

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
          {isLoading ? (
            <div className="space-y-4 px-2">
               {[1,2,3,4].map(i => <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />)}
            </div>
          ) : (
            navItems.map((item) => {
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
            })
          )}
        </nav>

        {!isCollapsed && role !== "admin" && (
          <div className="m-4 p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
            <p className="text-xs text-slate-400">Student Plan</p>
            <p className="text-sm font-semibold mt-1">Upgrade for Live Classes</p>
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
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 group focus-within:ring-2 ring-indigo-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
            />
          </div>
      

          <div className="flex items-center gap-6 my-5">
              <UserProfile></UserProfile>
          </div>
        </header>

        <main className="p-8 overflow-y-auto scrollbar-hide bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;