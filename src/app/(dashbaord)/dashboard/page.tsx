"use client";

import { useRole } from "@/hooks/useRole";
import StudentDashboard from "./student/page";
import AdminDashboard from "./admin/page";
import TeacherDashboard from './teacher/page'

export default function DashboardPage() {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (role === "student") {
    return <StudentDashboard />;
  }

  if (role === "teacher") {
    return <TeacherDashboard />;
  }

  if (role === "admin") {
    return <AdminDashboard />; 
  }

  return <p>Access Denied</p>;
}