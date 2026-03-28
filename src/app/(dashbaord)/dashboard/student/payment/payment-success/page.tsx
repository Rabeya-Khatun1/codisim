"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Suspense add kora hoyeche
import { CheckCircle, ArrowRight } from "lucide-react";

// 1. All logic moves to a separate component
function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  const enrollmentId = params.get("enrollmentId");
  const sessionId = params.get("session_id");

  const [countdown, setCountdown] = useState(5);

  // Payment confirm API call
  useEffect(() => {
    if (!enrollmentId) return;

    const confirmPayment = async () => {
      try {
        await fetch("/api/payment/success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId,
            transactionId: sessionId,
          }),
        });
      } catch (err) {
        console.log("Payment confirm error:", err);
      }
    };

    confirmPayment();
  }, [enrollmentId, sessionId]); // sessionId dependency-te add kora bhalo

  // Countdown timer
  useEffect(() => {
    if (!enrollmentId) return;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [enrollmentId]);

  // Redirect
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/dashboard/student/my-enrollments");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl text-center">
        <div className="mb-6">
          <CheckCircle size={60} className="text-green-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
        <p className="text-gray-500 mt-2">Your enrollment is now active.</p>

        <div className="mt-6 text-sm text-gray-400">
          Enrollment ID: {enrollmentId || "N/A"}
        </div>

        <button
          onClick={() => router.push("/dashboard/student/my-enrollments")}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          Go to My Courses <ArrowRight size={16} />
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Redirecting in{" "}
          <span className="text-indigo-600 font-bold">{countdown}s</span>
        </p>
      </div>
    </div>
  );
}

// 2. Main Page component wraps it in Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading payment status...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}