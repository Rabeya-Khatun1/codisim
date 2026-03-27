"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReviewModal from "@/components/ui/ReviewModal";
import {
  Star,
  Clock,
  Globe,
  ShieldCheck,
  ChevronRight,
  Play,
  Download,
} from "lucide-react";
import Link from "next/link";
import CourseCard from "@/components/cards/CourseCard";

export default function CourseClient({ course , related}: any) {
  const [showReview, setShowReview] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?courseId=${course._id}`);
    const data = await res.json();

    if (data.success) {
      setReviews(data.reviews);
    }
  };

  fetchReviews();
}, [course._id]);

  useEffect(() => {
    const handleBack = () => {
      setShowReview(true);
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  console.log("RELATED:", related);

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090a] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-12">

            {/* BADGE + TITLE */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
                <Globe className="w-3 h-3" /> New Release • {course.category}
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                {course.title}
              </h1>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-[#08090a] bg-slate-200 dark:bg-slate-800"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#08090a] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +{course.students}
                  </div>
                </div>

                <p className="text-sm font-medium opacity-70">
                  Joined by 12,000+ creators globally
                </p>
              </div>
            </div>

            {/* VIDEO */}
            <div className="group relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900 shadow-2xl">
              <Image
                src={course.image}
                alt="preview"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <button className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95">
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" /> Duration
                </h4>
                <p className="text-sm opacity-70">
                  {course.duration} of high-quality cinematic video lessons.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Certification
                </h4>
                <p className="text-sm opacity-70">
                  Earn a verified certificate upon completion.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">

              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm font-medium opacity-50 uppercase tracking-tight">
                      Full Access
                    </p>
                    <h2 className="text-4xl font-bold">
                      {course.price}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <button className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98]">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Enroll Today
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <p className="text-center text-[10px] opacity-40 font-bold uppercase tracking-widest mt-3">
                  Secure Checkout Powered by Stripe
                </p>

                <hr className="my-8 border-slate-100 dark:border-slate-800" />

                <div className="space-y-4">
                  <h4 className="text-sm font-bold opacity-80 italic">
                    Curriculum Highlights:
                  </h4>

                  {[
                    "Mastering the Core Tools",
                    "Advanced Workflow Secrets",
                    "Building Your First Pro Project",
                    "Final Portfolio Review",
                  ].map((lesson, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium opacity-70">
                        {lesson}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-sm font-bold">
                <Download className="w-4 h-4" />
                Download Syllabus (PDF)
              </button>

            </div>
          </div>

        </div>
      </div>
<div className=" px-12 grid gap-6 md:grid-cols-2 lg:grid-cols-1">
  {reviews.map((r: any) => (
    <div
      key={r._id}
      className="group relative p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col gap-4">
        {/* Top Section: User & Rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* User Avatar Placeholder */}
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
              {r.userName?.charAt(0) || 'U'}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">
                {r.userName || "Anonymous User"}
              </h4>
              <div className="flex items-center gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-[10px] ${i < r.rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent'}
            </span>
          </div>
        </div>

        {/* Review Content */}
        <div className="relative">
          <svg className="absolute -top-2 -left-2 w-6 h-6 text-slate-100 dark:text-slate-800 -z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C11.1212 16 12.0166 16.8954 12.0166 18V21C12.0166 22.1046 11.1212 23 10.0166 23H7.0166C5.91203 23 5.0166 22.1046 5.0166 21Z" />
          </svg>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic">
            "{r.review}"
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
<div className="max-w-7xl mx-auto px-6 py-10">
  <div className="flex items-end justify-between mb-8">
    <div>
      <h2 className="text-3xl font-black tracking-tight">
        Related Courses
      </h2>
      <p className="text-sm opacity-60 mt-1">
        Handpicked based on this category
      </p>
    </div>

    <span className="text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
      {related.length} courses
    </span>
  </div>

<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {related.map((c: any) => (
    <CourseCard
      key={c._id}
      course={{
        _id: c._id,
        title: c.title,
        price: c.price,
        instructor: c.instructor || "Unknown",
        rating: c.rating || 4.5,
        duration: c.duration || "3h",
        level: c.level || "Beginner",
        image: c.image,
      }}
    />
  ))}
</div>
</div>
      {/* MODAL */}
      {showReview && (
        <ReviewModal
          courseId={course._id}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  );
}