export const dynamic = "force-dynamic";
import { getMyEnrollments } from "@/lib/db/enrolments";
import { Clock, CheckCircle, XCircle, CreditCard, GraduationCap } from "lucide-react";
import EnrollmentActions from "./EnrollmentActions"; // path adjust koro

export default async function MyEnrollmentsPage() {
  const response = await getMyEnrollments();
  const enrollments = (response as any).data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "rejected": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  return (
    <div className="p-8 md:p-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-8">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Learning Journey</h1>
            <p className="text-slate-500 font-medium">Manage your enrolled courses and payments.</p>
          </div>
        </div>

        {enrollments.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] shadow-sm text-center border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <GraduationCap size={40} />
            </div>
            <p className="text-slate-500 text-lg font-semibold">You haven't enrolled in any courses yet.</p>
            <button className="mt-4 text-indigo-600 font-bold hover:underline">Browse Courses</button>
          </div>
        ) : (
          <div className="grid gap-4">
            {enrollments.map((item: any) => (
              <div 
                key={item._id} 
                className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 hover:border-indigo-100 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Course Info */}
                <div className="flex gap-5 items-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                    <GraduationCap size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-950 transition-colors">{item.courseName}</h3>
                    <div className="flex items-center gap-4">
                        <p className="text-slate-400 text-xs flex items-center gap-1 font-bold tracking-tight">
                            <Clock size={12} /> {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </p>
                        <p className="text-indigo-600 font-black text-sm">{item.price} BDT</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Status & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
                  <div className="flex items-center gap-3">
                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(item.status)}`}>
                        {item.status === "approved" && <CheckCircle size={12} />}
                        {item.status === "rejected" && <XCircle size={12} />}
                        {item.status === "pending" && <Clock size={12} />}
                        {item.status}
                    </div>

                    {/* Payment Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        item.paymentStatus === "paid" ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                        <CreditCard size={12} />
                        {item.paymentStatus || 'UNPAID'}
                    </div>
                  </div>

                  {/* Actions (Three Dot) */}
                  <EnrollmentActions item={item} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}