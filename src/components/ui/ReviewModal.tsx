"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  courseId: string;
  onClose: () => void;
}

export default function ReviewModal({ courseId, onClose }: Props) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleSubmit = async () => {
  setLoading(true);

  try {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        rating,
        review,
      }),
    });

    const data = await res.json();

    if (data.success) {
  onClose();
  router.push('/courses'); 
} else {
      alert(data.message);
    }
  } catch {
    alert("Something went wrong");
  }

  setLoading(false);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      {/* Card */}
      <div className="w-[420px] rounded-3xl bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden">

        {/* glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Share Your Experience</h2>
            <p className="text-xs opacity-60">Help others by giving feedback</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-105 transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2 opacity-70">Your Rating</p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className="text-3xl transition transform hover:scale-110"
              >
                <span
                  className={
                    num <= rating
                      ? "text-yellow-400 drop-shadow"
                      : "text-slate-300 dark:text-slate-600"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your thoughts about this course..."
            className="w-full h-28 resize-none rounded-2xl p-4 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}


