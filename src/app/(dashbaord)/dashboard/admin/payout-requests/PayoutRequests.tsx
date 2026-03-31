"use client";

import React, { useState, useEffect } from "react";
import { Banknote, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { PayoutSkeleton } from "@/components/skeletons/PayoutSkeleton";

export const PayoutRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000)); 

        setRequests([
          {
            id: "PW-1",
            instructor: "Anisul Islam",
            amount: 5000,
            method: "Bkash",
            number: "017XXXXXXXX",
            status: "pending",
          },
          {
            id: "PW-2",
            instructor: "Jhankar Mahbub",
            amount: 12000,
            method: "Bank Transfer",
            number: "123-456-789",
            status: "pending",
          },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handlePayout = async (id: string) => {
    try {
      setActionLoadingId(id);

      // fake API delay
      await new Promise((res) => setTimeout(res, 800));

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "completed" } : req
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return <PayoutSkeleton/>;
  }

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Banknote /> Payout Requests
        </h2>
        <p className="text-blue-100 text-sm">
          Review and process instructor withdrawals
        </p>
      </div>

      <div className="p-6 grid gap-4">
        {requests.map((req) => {
          const isLoading = actionLoadingId === req.id;

          return (
            <div
              key={req.id}
              className="flex flex-col md:flex-row items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Banknote size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {req.instructor}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {req.method}:{" "}
                    <span className="font-mono font-bold text-gray-700">
                      {req.number}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-8">
                <div className="text-right">
                  <div className="text-lg font-black text-gray-900">
                    ৳{req.amount}
                  </div>

                  <div
                    className={`flex items-center justify-end gap-1 text-xs font-bold uppercase ${
                      req.status === "pending"
                        ? "text-amber-500"
                        : "text-blue-600"
                    }`}
                  >
                    {req.status === "pending" ? (
                      <Clock size={12} />
                    ) : (
                      <CheckCircle2 size={12} />
                    )}
                    {req.status}
                  </div>
                </div>

                {req.status === "pending" && (
                  <button
                    disabled={isLoading}
                    onClick={() => handlePayout(req.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};