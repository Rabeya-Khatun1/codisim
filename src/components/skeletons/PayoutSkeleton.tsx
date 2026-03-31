// components/skeletons/PayoutSkeleton.tsx
import { Banknote } from "lucide-react";

export const PayoutSkeleton = () => {
  return (
    <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Header Skeleton - Gradient remains but content pulses */}
      <div className="p-6 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white">
        <div className="flex items-center gap-2 mb-2">
           <Banknote className="opacity-50" />
           <div className="h-7 w-48 bg-white/20 rounded-lg" />
        </div>
        <div className="h-4 w-64 bg-white/10 rounded" />
      </div>

      <div className="p-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row items-center justify-between p-5 border border-gray-50 rounded-2xl gap-6">
            
            {/* Left Side: Instructor Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="h-12 w-12 bg-slate-100 rounded-full shrink-0" />
              <div className="space-y-3">
                <div className="h-5 w-40 bg-slate-200 rounded-md" />
                <div className="h-3 w-32 bg-slate-100 rounded" />
              </div>
            </div>

            {/* Right Side: Amount & Button */}
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right space-y-2">
                <div className="h-6 w-20 bg-slate-200 rounded-md ml-auto" />
                <div className="h-3 w-16 bg-slate-100 rounded ml-auto" />
              </div>
              
              {/* Button Placeholder */}
              <div className="h-11 w-32 bg-blue-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};