export const AdminSettingsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-9 w-64 bg-slate-200 rounded-lg" />
        <div className="h-11 w-40 bg-slate-100 rounded-xl" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 w-full bg-slate-50 border border-slate-100 rounded-xl flex items-center px-4 gap-3">
               <div className="h-5 w-5 bg-slate-200 rounded" />
               <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
          ))}
        </div>


        <div className="flex-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">

          <div className="h-7 w-40 bg-slate-200 rounded-lg border-b pb-4 mb-6" />
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-32 bg-slate-100 rounded" />
              <div className="h-12 w-full bg-slate-50 border border-slate-100 rounded-xl" />
            </div>
          ))}

          <div className="space-y-3">
            <div className="h-4 w-32 bg-slate-100 rounded" />
            <div className="h-24 w-full bg-slate-50 border border-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};