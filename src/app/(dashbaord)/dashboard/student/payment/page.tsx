"use client";

import { CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react"; // Suspense import koren

// 1. Asol logic-ta ekhne thakbe
function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const enrollmentId = params.get("enrollmentId");

  useEffect(() => {
    const startPayment = async () => {
      try {

        const infoRes = await fetch(`/api/enrollments/${enrollmentId}`);
        const infoData = await infoRes.json();
        console.log("infodata is", infoData)

        if (!infoData.success) {
          router.push("/dashboard/student/payment/payment-error");
          return;
        }
        const res = await fetch("/api/payment/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollmentId,courseName: infoData.data.courseName, 
            userEmail: infoData.data.studentEmail }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          router.push("/dashboard/student/payment/error");
        }
      } catch (err) {
        router.push("/dashboard/student/payment/error");
      }
    };

    if (enrollmentId) startPayment();
  }, [enrollmentId, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="relative bg-indigo-50 p-6 rounded-3xl text-indigo-600">
            <Loader2 size={48} className="animate-spin" />
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Preparing Checkout
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed px-4">
            Please wait while we securely redirect you to our trusted payment gateway.
          </p>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full w-1/2 rounded-full" 
               style={{ animation: 'loading-bar 2s infinite ease-in-out' }}
          />
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-slate-400 border-t border-slate-50">
          <div className="flex items-center gap-1.5">
            <Lock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          Do not refresh the page or click the back button.
        </p>

        <style jsx>{`
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}

// 2. Main export-e Suspense boundary diye wrap kora
export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}