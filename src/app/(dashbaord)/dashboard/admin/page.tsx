"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, BookOpen, ShieldCheck, Plus} from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";
import { RevenueChart } from "@/components/ui/RevenueCharts";
import { AdminDashboardSkeleton } from "@/components/skeletons/AdminDashboardSkeleton";

export default function AdminDashboard() {
  const router = useRouter();
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    activeCourses: 0,
    systemAdmins: 0,
    chartData: [],
    loading: true
  });

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatsData({
            totalUsers: data.usersCount,
            activeCourses: data.coursesCount,
            systemAdmins: data.adminsCount,
            chartData: data.chartData,
            loading: false
          });
        }
      });
  }, []);

  if (statsData.loading) return (
<AdminDashboardSkeleton></AdminDashboardSkeleton>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Overview</h1>
        <button onClick={() => router.push("/dashboard/admin/course-management/add")} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          <Plus size={18} /> New Course
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Users" value={statsData.totalUsers} 
          icon={Users} color="text-blue-600" bg="bg-blue-50" 
          onClick={() => router.push("/dashboard/admin/users")} 
        />
        <StatsCard 
          label="Active Courses" value={statsData.activeCourses} 
          icon={BookOpen} color="text-purple-600" bg="bg-purple-50" 
          onClick={() => router.push("/dashboard/admin/course-management")} 
        />
        <StatsCard 
          label="Admins" value={statsData.systemAdmins} 
          icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" 
          onClick={() => router.push("/dashboard/admin/users?role=admin")} 
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={statsData.chartData} />
   
    </div>
  );
}