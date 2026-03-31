// components/skeletons/CategorySkeleton.tsx
import { Tag } from "lucide-react";

export const CategorySkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8 animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1 bg-slate-100 rounded">
           <Tag className="text-slate-200" />
        </div>
        <div className="h-6 w-40 bg-slate-200 rounded-lg" />
      </div>

      {/* Add Input & Button Skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 h-11 bg-slate-50 border border-slate-100 rounded-xl" />
        <div className="w-24 h-11 bg-slate-200 rounded-xl" />
      </div>

      {/* Category Tags Skeleton */}
      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="h-9 w-28 bg-purple-50/50 border border-purple-100/50 rounded-full" 
          />
        ))}
      </div>
    </div>
  );
};