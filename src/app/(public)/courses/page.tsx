"use client"
import Courses from '@/components/home/Courses';
import React from 'react';

const CoursesPage = () => {
    return (
<Courses 
  showPagination={true}
  showFilter={true}
  title="All Courses"
/>
    );
};

export default CoursesPage;