import { LucideIcon, ArrowUpRight } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bg: string;
  onClick: () => void;
}

export const StatsCard = ({ label, value, icon: Icon, color, bg, onClick }: StatsCardProps) => (
  <div 
    onClick={onClick}
    className="group cursor-pointer bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
      <Icon size={120} />
    </div>
    <div className="relative z-10">
      <div className={`${bg} ${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
        <Icon size={28} />
      </div>
      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-black text-gray-800 tracking-tighter">{value}</h2>
        <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center">
          <ArrowUpRight size={10} /> LIVE
        </div>
      </div>
    </div>
  </div>
);