import React from 'react';
import { Plus, RotateCcw, Save, Download } from 'lucide-react';

export default function Controls({ theme, onAddRow, onReset, onSave, onExportCSV }) {
  const isRetro = theme === 'retro';
  const isLight = theme === 'modern-light';

  if (isRetro) {
    // Legacy CRT terminal style button layout
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 border-t-2 border-[#1e2e3d] pt-4 retro-font select-none">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onAddRow}
            className="border-2 border-[#1e2e3d] bg-[#dfddd5] px-3 py-1 text-xs text-[#1e2e3d] font-black cursor-pointer shadow-[2px_2px_0px_rgba(30,46,61,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(30,46,61,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            [ F3 ] ADD ROW
          </button>
          
          <button
            onClick={onReset}
            className="border-2 border-[#1e2e3d] bg-[#dfddd5] px-3 py-1 text-xs text-[#1e2e3d] font-black cursor-pointer shadow-[2px_2px_0px_rgba(30,46,61,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(30,46,61,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            [ F8 ] RESET GRID
          </button>

          <button
            onClick={onExportCSV}
            className="border-2 border-[#1e2e3d] bg-[#dfddd5] px-3 py-1 text-xs text-[#1e2e3d] font-black cursor-pointer shadow-[2px_2px_0px_rgba(30,46,61,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(30,46,61,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            [ F9 ] EXPORT CSV
          </button>
        </div>

        <button
          onClick={onSave}
          className="border-2 border-[#1e2e3d] bg-[#eaa028] px-4 py-1 text-xs text-[#1e2e3d] font-black cursor-pointer shadow-[2px_2px_0px_rgba(30,46,61,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(30,46,61,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          [ F5 ] SAVE & COMMIT
        </button>
      </div>
    );
  }

  // Premium Modern Controls
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 p-4 rounded-2xl border shadow-md transition-all duration-300 ${
      isLight 
        ? 'bg-white border-slate-200 shadow-slate-100/50' 
        : 'bg-slate-900/40 border-slate-200/5 backdrop-blur-md'
    }`}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onAddRow}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
            isLight 
              ? 'bg-slate-50 hover:bg-slate-100 border-slate-250 text-slate-700 hover:text-slate-900 shadow-inner' 
              : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700/50 hover:border-slate-600/50 text-slate-200 hover:text-white'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee Row</span>
        </button>

        <button
          onClick={onReset}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
            isLight 
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700' 
              : 'bg-slate-805 hover:bg-slate-750 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Table</span>
        </button>

        <button
          onClick={onExportCSV}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
            isLight 
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700' 
              : 'bg-slate-805 hover:bg-slate-750 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export to CSV</span>
        </button>
      </div>

      <button
        onClick={onSave}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-extrabold transition-all shadow-lg shadow-blue-500/20 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
      >
        <Save className="h-4 w-4" />
        <span>Save Database Records</span>
      </button>
    </div>
  );
}
