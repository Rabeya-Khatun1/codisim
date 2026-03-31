import { CreditCard, Calendar, MoreHorizontal } from "lucide-react";

export default function PaymentsSkeleton() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-16 animate-pulse">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Skeleton */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-10 mb-10">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-slate-100 rounded-lg" />
            <div className="h-4 w-64 bg-slate-50 rounded" />
          </div>
          <div className="mt-4 md:mt-0 flex gap-8">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-7 w-24 bg-slate-100 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-7 w-16 bg-slate-100 rounded-lg" />
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <div className="h-5 w-32 bg-slate-100 rounded" />
          <div className="h-4 w-16 bg-slate-100 rounded" />
        </div>

        {/* List Skeleton */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-5 flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-100 rounded" />
                  <div className="h-3 w-24 bg-slate-50 rounded" />
                </div>
              </div>

              {/* Middle (Desktop only) */}
              <div className="hidden md:flex items-center gap-2">
                <div className="h-4 w-24 bg-slate-50 rounded" />
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-6">
                <div className="space-y-2 flex flex-col items-end">
                  <div className="h-4 w-20 bg-slate-100 rounded" />
                  <div className="h-3 w-12 bg-slate-50 rounded" />
                </div>
                <div className="h-5 w-5 bg-slate-50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}