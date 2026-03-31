
export const AdminDashboardSkeleton = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-9 w-64 bg-gray-200 rounded-lg" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
        <div className="h-12 w-40 bg-indigo-100 rounded-2xl" />
      </div>

      {/* Stats Section Skeleton (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-gray-100 shrink-0" />
            <div className="space-y-3 w-full">
              <div className="h-4 w-24 bg-gray-100 rounded" />
              <div className="h-7 w-16 bg-gray-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart Skeleton */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 w-48 bg-gray-200 rounded-md" />
          <div className="h-4 w-32 bg-gray-100 rounded" />
        </div>
        
        {/* Fake Chart Bars */}
        <div className="h-[300px] w-full bg-gray-50 rounded-2xl flex items-end justify-around p-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="bg-gray-200 rounded-t-lg w-full" 
              style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};