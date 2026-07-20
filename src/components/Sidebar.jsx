import React from 'react';
import { LayoutDashboard, CreditCard } from 'lucide-react';

export default function Sidebar({ theme, activeTab, setActiveTab }) {
  const isRetro = theme === 'retro';
  const isLight = theme === 'modern-light';

  const menuItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'annual-advance', name: 'Annual Advance', icon: CreditCard },
  ];

  if (isRetro) {
    // In Retro mode, match the exact layout from the screenshot.
    // There is a single small tab on the left above the grid: "Annual Advance" (orange-yellow, black border)
    return (
      <div className="flex pl-1 pr-3 pt-1 select-none retro-font">
        <div className="border border-[#1e2e3d] bg-[#eaa028] px-2 py-0.5 text-xs text-[#1e2e3d] font-bold cursor-default select-none shadow-[1px_1px_0px_rgba(0,0,0,1)]">
          Annual Advance
        </div>
      </div>
    );
  }

  // Modern Theme Sidebar
  return (
    <aside className={`w-64 flex flex-col justify-between py-6 select-none shrink-0 border-r transition-all duration-300 ${
      isLight 
        ? 'bg-white border-slate-200 text-slate-800' 
        : 'bg-slate-900/40 border-slate-200/10 text-slate-100'
    }`}>
      <div className="px-4 space-y-7">
        {/* Navigation Group */}
        <div className="space-y-2">
          <p className={`text-[10px] font-bold uppercase tracking-wider px-3 pb-1 ${
            isLight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Navigation Menu
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/10'
                      : isLight
                      ? 'text-slate-605 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : `group-hover:scale-110 ${isLight ? 'text-slate-550' : 'text-slate-450'}`
                  }`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Session card (premium feel) */}
      <div className="px-4">
        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all duration-300 ${
          isLight 
            ? 'bg-slate-50 border-slate-200' 
            : 'bg-slate-950/40 border-slate-200/5'
        }`}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md">
            OP
          </div>
          <div>
            <h4 className={`text-xs font-bold leading-tight ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Operator PAY01</h4>
            <p className="text-[9px] text-emerald-500 font-semibold mt-0.5">Finance Department</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
