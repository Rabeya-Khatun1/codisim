// components/skeletons/EnrollmentSkeleton.tsx
import { User, Search, Filter } from "lucide-react";

export default function AdminEnrollmentSkeleton() {
  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="h-10 w-48 bg-slate-200 rounded-xl" />
            <div className="h-4 w-64 bg-slate-100 rounded" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-11 w-64 bg-white border border-slate-100 rounded-2xl shadow-sm" />
            <div className="h-11 w-11 bg-white border border-slate-100 rounded-2xl shadow-sm" />
          </div>
        </div>

        {/* List Skeleton */}
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white p-5 md:p-6 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Side */}
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-slate-100" />
                <div className="space-y-3">
                  {/* Course Name Placeholder */}
                  <div className="h-5 w-48 bg-slate-200 rounded-lg" />
                  <div className="flex gap-4 items-center">
                    {/* Student Name Placeholder */}
                    <div className="h-4 w-24 bg-slate-100 rounded" />
                    {/* Status Badge Placeholder */}
                    <div className="h-6 w-20 bg-slate-50 rounded-full border border-slate-100" />
                  </div>
                </div>
              </div>

              {/* Right Side (More Button) */}
              <div className="h-10 w-10 bg-slate-50 rounded-xl ml-auto md:ml-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}