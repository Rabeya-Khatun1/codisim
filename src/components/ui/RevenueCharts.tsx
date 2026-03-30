"use client";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp } from "lucide-react";

export const RevenueChart = ({ data = [] }: { data?: any[] }) => {
  
  // Data load na thakle skeleton ba empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm h-[400px] flex items-center justify-center">
        <p className="text-slate-400 animate-pulse">Gathering revenue insights...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <TrendingUp size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Revenue Analytics
            </h2>
          </div>
          <p className="text-sm text-slate-400 font-medium ml-10">Monthly performance overview</p>
        </div>
        
        <div className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Real-time Data</span>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f1f5f9" 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} 
              dy={15}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} 
            />
            
            <Tooltip 
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
              contentStyle={{ 
                borderRadius: '20px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                padding: '12px 16px'
              }}
              itemStyle={{ color: '#4f46e5', fontWeight: 900, fontSize: '14px' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}
              formatter={(value) => [
  `$${(value ?? 0).toLocaleString()}`,
  "Revenue"
]}
            />
            
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#4f46e5" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{
  strokeWidth: 0,
  fill: '#4f46e5',
  filter: 'drop-shadow(0 0 6px rgba(79, 70, 229, 0.6))'
}}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};