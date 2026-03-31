// components/skeletons/EnrollmentsSkeleton.tsx
import { GraduationCap } from "lucide-react";

export default function MyEnrollmentsSkeleton() {
  return (
    <div className="p-8 md:p-12 bg-[#F8FAFC] min-h-screen animate-pulse">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-8">
          <div className="p-3 bg-slate-200 rounded-2xl text-slate-300">
            <GraduationCap size={32} />
          </div>
          <div className="space-y-3">
            <div className="h-8 w-64 bg-slate-200 rounded-lg" />
            <div className="h-4 w-48 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Enrollment Cards Skeleton */}
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-[2rem] border border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Side: Course Info */}
              <div className="flex gap-5 items-center">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl" />
                <div className="space-y-3">
                  <div className="h-6 w-48 bg-slate-200 rounded-lg" />
                  <div className="flex items-center gap-4">
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                    <div className="h-4 w-20 bg-slate-200 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Right Side: Status & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
                <div className="flex items-center gap-3">
                  {/* Status Badges */}
                  <div className="h-7 w-20 bg-slate-100 rounded-full" />
                  <div className="h-7 w-20 bg-slate-100 rounded-full" />
                </div>
                {/* More Icon */}
                <div className="h-8 w-8 bg-slate-50 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}