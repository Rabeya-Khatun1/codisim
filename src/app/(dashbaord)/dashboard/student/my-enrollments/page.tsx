
import { getMyEnrollments } from "@/lib/db/enrolments";
import { Clock, CheckCircle, XCircle, CreditCard } from "lucide-react";

export default async function MyEnrollmentsPage() {
  const response = await getMyEnrollments();
  const enrollments = (response as any).data || [];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Enrollments</h1>

        {enrollments.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-100">
            <p className="text-gray-500 text-lg">You haven't enrolled in any courses yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {enrollments.map((item: any) => (
              <div 
                key={item._id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Course Info */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">{item.courseName}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock size={14} /> Enrolled on: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-indigo-600 font-semibold">{item.price} BDT</p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3">
                  {/* Approval Status */}
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                    item.status === "approved" ? "bg-green-50 text-green-700" : 
                    item.status === "rejected" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {item.status === "approved" && <CheckCircle size={16} />}
                    {item.status === "rejected" && <XCircle size={16} />}
                    {item.status === "pending" && <Clock size={16} />}
                    {item.status.toUpperCase()}
                  </div>

                  {/* Payment Status */}
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                    item.paymentStatus === "paid" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    <CreditCard size={16} />
                    {item.paymentStatus === "paid" ? "PAID" : "UNPAID"}
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {item.status === "approved" && item.paymentStatus === "unpaid" ? (
                    <button className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition">
                      Pay Now
                    </button>
                  ) : (
                    <button className="w-full md:w-auto px-6 py-2.5 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}