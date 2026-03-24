import React from 'react';

const Courses = () => {
    return (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-full bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="flex justify-between items-center">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
    );
};

export default Courses;