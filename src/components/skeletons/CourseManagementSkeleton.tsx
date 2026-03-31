// components/skeletons/CourseManagementSkeleton.tsx
import { BookOpen } from "lucide-react";

export const CourseManagementSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <BookOpen className="text-blue-200" size={24} />
          </div>
          <div className="h-6 w-40 bg-gray-200 rounded-lg" />
        </div>
      </div>
      
      {/* Table Skeleton */}
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4"><div className="h-3 w-24 bg-gray-200 rounded" /></th>
            <th className="px-6 py-4"><div className="h-3 w-20 bg-gray-200 rounded" /></th>
            <th className="px-6 py-4 text-right"><div className="h-3 w-16 bg-gray-200 rounded ml-auto" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <div className="h-4 w-48 bg-gray-100 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-50 rounded" />
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                {/* View Icon Button Skeleton */}
                <div className="h-9 w-9 bg-gray-50 rounded-lg" />
                {/* Approve Button Skeleton */}
                <div className="h-9 w-24 bg-green-50/50 rounded-lg" />
                {/* Reject Button Skeleton */}
                <div className="h-9 w-24 bg-red-50/50 rounded-lg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};