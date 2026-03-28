"use client";

import { useRouter } from "next/navigation";
import { XCircle, RefreshCcw, MessageCircle, AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FFFBFB] flex items-center justify-center p-6">
      {/* Error Card */}
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl shadow-rose-100 border border-rose-50 text-center relative overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Background Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-60" />

        {/* Animated Error Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-rose-100 rounded-full scale-150 opacity-20 animate-pulse" />
          <div className="relative w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-200">
            <XCircle size={48} className="text-white animate-[shake_0.5s_ease-in-out_infinite]" 
               style={{ animationIterationCount: 2 }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 relative z-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Payment Failed
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Oops! Something went wrong with your transaction. Don't worry, no money was deducted from your account.
          </p>
        </div>

        {/* Possible Reasons / Info Box */}
        <div className="mt-8 p-4 bg-rose-50/50 rounded-2xl border border-dashed border-rose-200 flex items-start gap-3 text-left">
          <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wider">Common Reasons:</p>
            <ul className="text-[11px] text-rose-600/80 font-medium list-disc ml-4">
              <li>Insufficient balance or card limit.</li>
              <li>Network connection timed out.</li>
              <li>Transaction cancelled by user.</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button 
            onClick={() => router.back()}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
          >
            <RefreshCcw size={18} /> Try Payment Again
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 text-slate-500 font-bold py-2 hover:text-rose-600 transition-colors text-sm">
            <MessageCircle size={16} /> Contact Support
          </button>
        </div>

        {/* Bottom Link */}
        <button 
          onClick={() => router.push("/")}
          className="mt-6 pt-6 border-t border-slate-50 w-full text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
        >
          Return to Home Page
        </button>

        {/* Custom Shake Animation */}
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}</style>
      </div>
    </div>
  );
}