"use client";

import { useState } from "react";
import { MoreVertical, CreditCard, Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnrollmentActions({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // Status check logic
  const canPay = item.status === "approved" && item.paymentStatus !== "paid";

//   const handlePayment = async (item: any) => {
//   const res = await fetch("/api/payment/checkout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       courseName: item.courseName,
//       price: item.price,
//       enrollmentId: item._id,
//     }),
//   });

//   const data = await res.json();

//   // 🔥 redirect to stripe
//   window.location.href = data.url;
// };
const router = useRouter();

const handlePaymentClick = (item: any) => {
  router.push(`/dashboard/student/payment?enrollmentId=${item._id}`);
};
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl z-50 py-2 animate-in fade-in zoom-in duration-200">
            {canPay && (
              <button   onClick={() => handlePaymentClick(item)} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">
                <CreditCard size={16} /> Pay Now
              </button>
            )}
            
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <Eye size={16} /> View Course
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <FileText size={16} /> Invoice
            </button>
          </div>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}