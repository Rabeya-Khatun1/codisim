import { getPayments } from "@/lib/db/payment";
import { 
  CreditCard, 
  Calendar, 
  MoreHorizontal,
  Circle
} from "lucide-react";

export default async function PaymentsPage() {
  const res = await getPayments();
  const payments = res.data || [];

  const totalRevenue = payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-16 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- MINIMAL HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-10 mb-10">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-slate-900">Payments</h1>
            <p className="text-slate-400 text-sm mt-1">Review your transaction history and earnings.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Revenue</p>
              <p className="text-xl font-semibold">${totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Transactions</p>
              <p className="text-xl font-semibold">{payments.length}</p>
            </div>
          </div>
        </header>

        {/* --- SIMPLE SEARCH/FILTER --- */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-800">Recent Activity</h2>
            <button className="text-xs font-medium text-indigo-600 hover:underline">View All</button>
        </div>

        {/* --- THE LIST (MINIMALIST) --- */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {payments.length === 0 ? (
            <div className="p-20 text-center text-slate-400 text-sm">
              No transactions found.
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {payments.map((pay: any) => (
                <div key={pay._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  
                  {/* Left Side: Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Course Purchase</p>
                      <p className="text-[11px] text-slate-400 uppercase tracking-tighter">
                        ID: {pay.transactionId?.toString().slice(-10) ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Date */}
                  <div className="hidden md:flex items-center gap-2 text-slate-400">
                    <Calendar size={14} />
                    <span className="text-xs">{pay.createdAt ? new Date(pay.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>

                  {/* Right Side: Amount & Status */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">${(pay.amount ?? 0).toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-1.5 mt-0.5">
                         <Circle size={6} className={pay.status === 'paid' ? 'fill-emerald-500 text-emerald-500' : 'fill-amber-500 text-amber-500'} />
                         <span className="text-[10px] font-medium text-slate-500 uppercase">{pay.status}</span>
                      </div>
                    </div>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- FOOTER NOTE --- */}
        <footer className="mt-8 text-center">
            <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em]">Secure Cloud Payments • Encrypted</p>
        </footer>

      </div>
    </div>
  );
}