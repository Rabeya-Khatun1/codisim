// components/skeletons/ProfileSkeleton.tsx
export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-48 md:h-64 bg-slate-200 w-full" />
      
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-6">
          {/* Avatar Skeleton */}
          <div className="h-32 w-32 rounded-full border-4 border-white bg-slate-100 shadow-sm" />
          
          <div className="flex-1 space-y-3 pb-2">
            <div className="h-8 w-48 bg-slate-200 rounded-lg" />
            <div className="h-4 w-32 bg-slate-100 rounded" />
          </div>
          
          <div className="h-10 w-28 bg-slate-100 rounded-xl mb-2" />
        </div>

        {/* Bio & Details Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="md:col-span-1 space-y-6">
            <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100" />
            <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-40 bg-slate-50 rounded-2xl border border-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}