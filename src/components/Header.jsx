import React, { useState, useEffect } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';

export default function Header({ theme, setTheme }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${dayName}, ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const isRetro = theme === 'retro';
  const isLight = theme === 'modern-light';

  return (
    <header className={`w-full select-none ${
      isRetro 
        ? 'border-b-4 border-[#1e2e3d] bg-[#dfddd5] px-4 py-2 retro-font' 
        : isLight
        ? 'border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-4 text-slate-900 shadow-sm'
        : 'border-b border-slate-200/10 bg-slate-950/60 backdrop-blur-md px-6 py-4 text-white'
    }`}>
      {/* Upper Meta-Header / Top Bar */}
      {isRetro ? (
        <div className="flex flex-col gap-1 w-full text-[#1e2e3d] font-bold">
          <div className="flex justify-between items-center text-xs tracking-wider border-b border-[#1e2e3d] pb-1">
            <span>MARUTI SUZUKI INDIA LIMITED</span>
            <div className="flex items-center gap-4">
              {/* Retro Theme Switcher in header row */}
              <div className="flex items-center gap-2 border border-[#1e2e3d] bg-white px-2 py-0.5 text-[10px]">
                <span className="mr-1">THEME:</span>
                <button 
                  onClick={() => setTheme('modern-dark')} 
                  className="hover:underline cursor-pointer"
                >
                  MOD-DARK
                </button>
                <span>|</span>
                <button 
                  onClick={() => setTheme('modern-light')} 
                  className="hover:underline cursor-pointer"
                >
                  MOD-LIGHT
                </button>
                <span>|</span>
                <button 
                  onClick={() => setTheme('retro')} 
                  className="underline text-orange-600 font-extrabold cursor-pointer"
                >
                  RETRO
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[13px] pt-1">
            <span className="font-extrabold">PAY</span>
            <span className="text-lg tracking-widest text-[#1e2e3d] font-black">ANNUAL ADVANCE ENTRY</span>
            <span className="text-xs font-mono">{formatDateTime(time)}</span>
          </div>

          <div className="flex justify-between items-center text-[13px] mt-1 border-t border-[#1e2e3d] pt-1">
            <span className="font-extrabold">ANUADV</span>
            <span className="font-extrabold tracking-wider">PAYMENT</span>
            <span className="opacity-0">HIDDEN</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Modern corporate brand info */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-black text-white text-lg tracking-wider">MS</span>
            </div>
            <div>
              <h1 className={`text-sm font-extrabold tracking-widest uppercase flex items-center gap-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Maruti Suzuki <span className={`text-xs lowercase italic font-light px-1.5 py-0.5 rounded-full border ${isLight ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-cyan-400 bg-cyan-950/40 border-cyan-800/30'}`}>portal</span>
              </h1>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Annual Advance Settlement System
              </p>
            </div>
          </div>

          {/* Center Titles (styled nicely for modern UI) */}
          <div className="hidden lg:flex flex-col items-center justify-center text-center">
            <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>Payment Category</span>
            <span className={`text-md font-extrabold tracking-wider ${
              isLight 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200'
            }`}>
              Annual Advance Entry (ANUADV)
            </span>
          </div>

          {/* Right Controls: Dynamic Clock & Modern Theme Switcher */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right">
              <div className={`text-xs font-bold font-mono tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                {formatDateTime(time)}
              </div>
            </div>

            <div className={`h-8 w-px hidden sm:block ${isLight ? 'bg-slate-200' : 'bg-slate-200/10'}`}></div>

            {/* Theme Toggle Group */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border ${
              isLight ? 'bg-slate-100 border-slate-250' : 'bg-slate-950/60 border-slate-200/10'
            }`}>
              <button
                onClick={() => setTheme('modern-dark')}
                title="Modern Dark Theme"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  theme === 'modern-dark'
                    ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md'
                    : isLight 
                    ? 'text-slate-500 hover:text-slate-800' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('modern-light')}
                title="Modern Light Theme"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  theme === 'modern-light'
                    ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md'
                    : isLight 
                    ? 'text-slate-500 hover:text-slate-850' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('retro')}
                title="Retro CRT Terminal Clone"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  theme === 'retro'
                    ? 'bg-[#dfddd5] text-[#1e2e3d] shadow-md border border-[#1e2e3d]'
                    : isLight 
                    ? 'text-slate-500 hover:text-slate-855' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
