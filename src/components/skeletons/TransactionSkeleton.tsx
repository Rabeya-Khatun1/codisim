

export const TransactionSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 px-2">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-xl" />
            <div className="h-8 w-32 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-4 w-56 bg-slate-100 rounded" />
        </div>

        <div className="h-12 w-full md:w-80 bg-white border border-slate-100 rounded-2xl shadow-sm" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-slate-50/50">
            <tr>
              {[1, 2, 3, 4, 5].map((i) => (
                <th key={i} className="px-8 py-5 text-left">
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <tr key={row}>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-32 bg-slate-100 rounded" />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                   <div className="h-4 w-40 bg-slate-100 rounded" />
                </td>
                <td className="px-8 py-5">
                   <div className="h-4 w-20 bg-slate-50 rounded" />
                </td>
                <td className="px-8 py-5">
                   <div className="h-5 w-16 bg-slate-200 rounded" />
                </td>
                <td className="px-8 py-5">
                   <div className="h-6 w-20 bg-slate-100 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between">
          <div className="h-3 w-28 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};