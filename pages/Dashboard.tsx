
import React from 'react';
import { DashboardData, Organization } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STAT_ACCENT_CLASSES = {
  indigo: 'bg-indigo-50',
  emerald: 'bg-emerald-50',
  rose: 'bg-rose-50',
  amber: 'bg-amber-50',
} as const;

const Dashboard: React.FC<{ org: Organization; dashboard: DashboardData }> = ({ org, dashboard }) => {
  const averageDurationLabel = dashboard.stats.avgDurationMinutes > 0
    ? `${dashboard.stats.avgDurationMinutes.toFixed(1)}m`
    : '0m';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Calls', value: dashboard.stats.totalCalls.toString(), delta: 'Live', color: 'indigo' },
          { label: 'Leads Captured', value: dashboard.stats.leadsCaptured.toString(), delta: 'Live', color: 'emerald' },
          { label: 'Missed Calls', value: dashboard.stats.missedCalls.toString(), delta: 'Live', color: 'rose' },
          { label: 'Avg Duration', value: averageDurationLabel, delta: 'Live', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full -mr-4 -mt-4 group-hover:scale-125 transition-transform ${STAT_ACCENT_CLASSES[stat.color as keyof typeof STAT_ACCENT_CLASSES]}`}></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{stat.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Lead Generation Flow</h3>
            <select className="bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.weeklyFlow}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="calls" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorCalls)" />
                <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Outcome Efficiency</h3>
          <div className="space-y-8">
            {dashboard.outcomeBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-3">
                  <span className="font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                  <span className="font-black text-slate-900">{item.count}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.count}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 group">
              <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">AI Shield Live</p>
                <p className="text-xs text-slate-500 font-medium italic">Agent {org.agent.name} is handling calls.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
