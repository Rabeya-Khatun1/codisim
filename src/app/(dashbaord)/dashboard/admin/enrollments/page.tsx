"use client";

import { useEffect, useState } from "react";
import {
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Loader2,
  User,
  Filter,
  BookOpen,
} from "lucide-react";
import { updateEnrollmentStatus } from "@/lib/db/enrolments";
import AdminEnrollmentSkeleton from "@/components/skeletons/AdminEnrollment";

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

  const handleStatusUpdate = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    if (!window.confirm(`Confirm ${newStatus} for this student?`)) return;
    try {
      const result = await updateEnrollmentStatus(id, newStatus);
      if (result.success) {
        setData((prev) =>
          prev.map((item) =>
            String(item._id) === String(id)
              ? { ...item, status: newStatus }
              : item
          )
        );
        setOpenMenu(null);
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };
if(loading) return <AdminEnrollmentSkeleton></AdminEnrollmentSkeleton>

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900">
              Enrollments
            </h1>
            <p className="text-slate-500 text-sm">
              Review and manage incoming student applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-50 outline-none w-64 text-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-500">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="grid gap-4">
          {loading ? (
            <div className="flex flex-col items-center py-32 text-slate-400">
              <Loader2 className="animate-spin mb-3 text-indigo-600" size={40} />
              <p className="text-xs">Loading...</p>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="group bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-visible"
              >
                {/* Left */}
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <User size={28} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      {item.courseName}
                    </h2>
   <div className="flex gap-6">
                     <p className="text-sm text-slate-500 m-2">{item.name}</p>
                    <div
  className={`inline-flex items-center gap-1.5 mt-1 px-3 py-1 text-[11px] font-semibold rounded-full border backdrop-blur-sm
  ${
    item.status === "approved"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : item.status === "rejected"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-amber-50 text-amber-700 border-amber-200"
  }`}
>
  {item.status === "approved" && <CheckCircle2 size={12} />}
  {item.status === "rejected" && <XCircle size={12} />}
  {(!item.status || item.status === "pending") && <Loader2 size={12} className="animate-spin" />}
  
  <span className="capitalize">
    {item.status || "pending"}
  </span>
</div>
   </div>
                  </div>
                </div>

                {/* Right */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === String(item._id)
                          ? null
                          : String(item._id)
                      )
                    }
                    className="p-3 hover:bg-slate-50 rounded-xl"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenu === String(item._id) && (
                    <>
                      {/* Overlay */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenMenu(null)}
                      />

                      {/* Dropdown */}
                      <div className="absolute right-0 mt-3 w-56 bg-white border shadow-2xl rounded-2xl z-50 py-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(item._id, "approved")
                          }
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
                        >
                          <CheckCircle2 size={18} /> Approve
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(item._id, "rejected")
                          }
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                        >
                          <XCircle size={18} /> Reject
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                          <Eye size={18} /> View
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <BookOpen size={40} className="mx-auto text-slate-300" />
              <p className="mt-4 text-slate-500">No applications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}