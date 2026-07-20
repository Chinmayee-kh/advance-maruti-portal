import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, theme }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isRetro = theme === 'retro';

  if (isRetro) {
    // Retro CRT dialog popup matching terminal warning colors
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 retro-font">
        <div className="bg-[#dfddd5] border-4 border-[#1e2e3d] p-6 max-w-sm w-full text-[#1e2e3d] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="border-b-2 border-[#1e2e3d] pb-2 mb-4 font-black flex justify-between items-center text-xs">
            <span>*** SYSTEM MESSAGE ***</span>
            <button onClick={onClose} className="cursor-pointer font-black text-sm hover:text-red-600">[X]</button>
          </div>
          <p className="text-xs font-bold leading-relaxed whitespace-pre-line text-center uppercase">
            {message}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="border-2 border-[#1e2e3d] bg-white px-4 py-1 text-xs font-black cursor-pointer shadow-[2px_2px_0px_rgba(30,46,61,1)] hover:bg-gray-100"
            >
              [ ENTER: CLOSE ]
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modern Toast Card
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in flex items-center gap-3.5 pl-4 pr-3 py-3 rounded-2xl border bg-slate-900/90 text-white shadow-2xl backdrop-blur-md max-w-sm w-full border-slate-200/10">
      <div className={`p-1.5 rounded-xl ${
        type === 'success' 
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      }`}>
        {type === 'success' ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <AlertTriangle className="h-5 w-5" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold text-slate-200">
          {type === 'success' ? 'Operation Success' : 'System Alert'}
        </h5>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-normal font-medium">
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
