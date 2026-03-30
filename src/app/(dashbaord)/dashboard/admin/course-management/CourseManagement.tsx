"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, BookOpen } from "lucide-react";

export const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const handleStatusUpdate = async (courseId: string, newStatus: "approved" | "rejected") => {
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setCourses(courses.filter((course: any) => course._id !== courseId)); // লিস্ট থেকে সরিয়ে দেওয়া
        alert(`Course ${newStatus} successfully!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-blue-600" /> Pending Courses
        </h2>
      </div>
      
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Course Title</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Instructor</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {courses.map((course: any) => (
            <tr key={course._id} className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{course.instructorName}</td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => handleStatusUpdate(course._id, "approved")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-semibold transition-colors"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button 
                  onClick={() => handleStatusUpdate(course._id, "rejected")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-semibold transition-colors"
                >
                  <XCircle size={16} /> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};