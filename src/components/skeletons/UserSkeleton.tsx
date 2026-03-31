import React from "react";

export const UserSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-3">
          <div className="h-9 w-64 bg-gray-200 rounded-lg" />
          <div className="h-4 w-80 bg-gray-100 rounded" />
        </div>
        <div className="h-11 w-36 bg-gray-200 rounded-lg shadow-sm" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {["User", "Ban", "Verify", "Status", "Role", "Actions"].map((head) => (
                <th key={head} className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-gray-200 shadow-sm" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-3 w-40 bg-gray-100 rounded" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="h-4 w-20 bg-gray-100 rounded mx-auto" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-16 bg-green-50 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-purple-100 rounded" />
                    <div className="h-4 w-16 bg-gray-100 rounded" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-8 w-8 bg-gray-50 rounded-lg ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};