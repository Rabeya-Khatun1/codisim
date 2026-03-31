// components/skeletons/EnrollmentSkeleton.tsx
export default function EnrollmentSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] p-4 md:p-10 animate-pulse">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section Skeleton */}
        <div className="lg:col-span-2 space-y-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-10">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
              </div>
            ))}
          </div>
          
          <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="h-14 w-full bg-indigo-200 dark:bg-indigo-900/30 rounded-2xl" />
        </div>

        {/* Right Section Skeleton */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 h-[300px]">
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          <div className="space-y-6">
            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            <div className="h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}