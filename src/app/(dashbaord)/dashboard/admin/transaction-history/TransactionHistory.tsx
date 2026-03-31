"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Search,User, BookOpen, Calendar } from "lucide-react";
import { TransactionSkeleton } from "@/components/skeletons/TransactionSkeleton";

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaction"); 
        const data = await res.json();
        if (data.success) {
          setTransactions(data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTxn = transactions.filter((txn) =>
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
<TransactionSkeleton></TransactionSkeleton>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <CreditCard className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Payments</h2>
          </div>
          <p className="text-sm text-slate-500 font-medium tracking-wide">Monitor your store's real-time revenue</p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all shadow-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table Wrapper - No global overflow-hidden here to keep the shadow intact */}
      <div className="relative">
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="inline-block min-w-full align-middle">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
              <table className="min-w-full divide-y divide-slate-50">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Customer</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Item</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Ref ID</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Amount</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-50">
                  {filteredTxn.map((txn) => (
                    <tr key={txn.id} className="hover:bg-blue-50/30 transition-all duration-200 group">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                            <User size={16} className="text-slate-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800 tracking-tight">{txn.customerName || "User"}</div>
                            <div className="text-[11px] font-medium text-slate-400">{txn.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <BookOpen size={14} className="text-slate-300" />
                          <span className="text-sm font-semibold text-slate-600">{txn.courseTitle}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                         <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-1 rounded-md group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                           {txn.id.slice(0, 15)}...
                         </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className="text-sm font-black text-slate-800">৳{(txn.amount / 100).toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          txn.status === 'succeeded' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {txn.status === 'succeeded' ? '● Paid' : '● ' + txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Table Footer */}
              <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing {filteredTxn.length} entries
                </p>
                <div className="flex items-center gap-2 text-slate-400">
                   <Calendar size={12} />
                   <span className="text-[10px] font-bold tracking-tighter">{new Date().toDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>

    </div>
  );
};

export default TransactionHistory;