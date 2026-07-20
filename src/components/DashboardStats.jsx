import React from 'react';
import { DollarSign, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function DashboardStats({ theme, rows }) {
  if (theme === 'retro') return null; // Keep retro mode minimal and matching the screenshot exactly
  
  const isLight = theme === 'modern-light';

  // Calculate stats dynamically
  const activeRows = rows.filter(r => r.staffNo.trim() !== '');
  const totalEmployees = activeRows.length;
  
  const totalAdvance = activeRows.reduce((sum, r) => sum + (Number(r.advAmt) || 0), 0);
  
  const pendingApprovals = activeRows.filter(r => r.status === 'Pending').length;
  
  const disbursedAmount = activeRows
    .filter(r => r.status === 'Disbursed')
    .reduce((sum, r) => sum + (Number(r.advAmt) || 0), 0);

  const stats = [
    {
      title: 'Total Advance Requested',
      value: `₹${totalAdvance.toLocaleString('en-IN')}`,
      icon: DollarSign,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-400',
      glow: 'shadow-blue-500/10'
    },
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400',
      glow: 'shadow-cyan-500/10'
    },
    {
      title: 'Pending Reviews',
      value: pendingApprovals,
      icon: AlertCircle,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
      glow: 'shadow-amber-500/10'
    },
    {
      title: 'Disbursed Amount',
      value: `₹${disbursedAmount.toLocaleString('en-IN')}`,
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      glow: 'shadow-emerald-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all duration-300 hover:translate-y-[-2px] shine-effect flex items-center justify-between shadow-lg ${
              isLight 
                ? 'bg-white border-slate-200 hover:bg-slate-50 shadow-slate-100' 
                : 'bg-slate-900/40 border-slate-200/5 hover:bg-slate-900/60 shadow-black/20'
            }`}
          >
            <div className="space-y-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {stat.title}
              </span>
              <span className={`text-xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {stat.value}
              </span>
            </div>
            <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
