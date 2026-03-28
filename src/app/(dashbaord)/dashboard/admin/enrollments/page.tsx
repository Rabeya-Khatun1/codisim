"use client";

import { useEffect, useState } from "react";
import { 
  MoreVertical, CheckCircle2, XCircle, Eye, 
  Search, Loader2, User, Filter, BookOpen
} from "lucide-react";
import { updateEnrollmentStatus } from "@/lib/db/enrolments";

export default function EnrollmentAdmin() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enrollments");
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected") => {
    if (!window.confirm(`Confirm ${newStatus} for this student?`)) return;
    try {
      const result = await updateEnrollmentStatus(id, newStatus);
      if (result.success) {
        setData((prev) => prev.map((item) => item._id === id ? { ...item, status: newStatus } : item));
        setOpenMenu(null);
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "rejected": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Enrollments</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Review and manage incoming student applications.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  className="pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-50 outline-none w-64 transition-all text-sm font-medium"
                />
             </div>
             <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
                <Filter size={20} />
             </button>
          </div>
        </div>

        {/* Enrollment Grid/List */}
        <div className="grid gap-4">
          {loading ? (
            <div className="flex flex-col items-center py-32 text-slate-400">
              <Loader2 className="animate-spin mb-3 text-indigo-600" size={40} />
              <p className="font-bold tracking-widest uppercase text-[10px]">Synchronizing Data</p>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="group bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${item.status === 'approved' ? 'bg-emerald-500' : item.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-400'}`} />

                <div className="flex items-center gap-5">
                  {/* Avatar Section */}
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-500 border border-slate-200 group-hover:border-indigo-100 shadow-inner">
                    <User size={28} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-indigo-700 transition-colors">
                        {item.courseName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 font-bold">
                        <User size={14} className="opacity-50" /> {item.name}
                      </p>
                      <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(item.status)}`}>
                        {item.status || "pending"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Info & Action */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
                  <div className="hidden lg:block text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Date</p>
                    <p className="text-sm font-bold text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</p> 
                  </div>

                  <div className="relative">
                    <button 
                      onClick={() => setOpenMenu(openMenu === item._id ? null : item._id)}
                      className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenu === item._id && (
                      <>
                        <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] z-50 py-3 animate-in fade-in zoom-in duration-200">
                          <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Take Action</p>
                          <button 
                            onClick={() => handleStatusUpdate(item._id, "approved")}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
                          >
                            <CheckCircle2 size={18} /> Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(item._id, "rejected")}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <XCircle size={18} /> Reject
                          </button>
                          <div className="h-[1px] bg-slate-50 my-2 mx-2" />
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <Eye size={18} /> View Details
                          </button>
                        </div>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <BookOpen size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-800">No Applications</h3>
               <p className="text-slate-500 max-w-xs mx-auto text-sm mt-2 font-medium">When students apply for courses, they will appear here for your review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}