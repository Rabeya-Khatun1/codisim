import React from 'react';

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
      
      {/* Content Skeleton */}
      <div className="space-y-3 px-2">
        <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
        
        <div className="flex justify-between items-center pt-4">
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-8 w-24 bg-blue-100 dark:bg-blue-900/30 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;