import Courses from '@/components/home/Courses';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Browse all available courses on Learn Hub. Learn web development, programming, and more with expert instructors.",

  openGraph: {
    title: "All Courses | Learn Hub",
    description:
      "Explore all courses on Learn Hub and start learning new skills today.",
    url: "https://learnhub-fawn.vercel.app/courses",
    siteName: "Learn Hub",
    type: "website",
    images: [
      {
        url: "/public/courses.png", 
        width: 1200,
        height: 630,
        alt: "All Courses - Learn Hub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "All Courses | Learn Hub",
    description:
      "Explore all courses and start learning today.",
    images: ["/public/courses.png"],
  },

  alternates: {
    canonical: "https://learnhub-fawn.vercel.app/courses",
  },

  keywords: [
    "online courses",
    "learn programming",
    "react course",
    "next.js course",
    "LMS platform courses",
  ],
};


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