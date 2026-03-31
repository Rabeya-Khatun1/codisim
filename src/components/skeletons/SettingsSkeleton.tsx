// components/skeletons/SettingsSkeleton.tsx
export default function SettingsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-slate-100 rounded" />
          <div className="h-8 w-40 bg-slate-200 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 h-64" />
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-slate-50 rounded-xl" />
            <div className="h-12 bg-slate-50 rounded-xl" />
          </div>
          <div className="h-12 bg-slate-50 rounded-xl" />
          <div className="h-32 bg-slate-50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}