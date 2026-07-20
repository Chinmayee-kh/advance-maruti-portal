import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import AdvanceTable from './components/AdvanceTable';
import Controls from './components/Controls';
import Toast from './components/Toast';
import { initialTableRows, employeeDatabase } from './data/employees';
import { Search, Info, TrendingUp, ShieldAlert, BarChart3, Clock } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('modern-dark');
  const [activeTab, setActiveTab] = useState('annual-advance');
  const [rows, setRows] = useState(initialTableRows);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Sync theme to body element class list
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Quick helper to trigger toasts
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Actions
  const handleAddRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    const newRow = {
      id: newId,
      staffNo: '',
      name: '',
      level: '',
      advAmt: 0,
      status: 'Pending'
    };
    setRows([...rows, newRow]);
    triggerToast('Added new empty entry row.', 'success');
  };

  const handleReset = () => {
    setRows(initialTableRows);
    setSearchQuery('');
    triggerToast('Grid values reset to initial database values.', 'success');
  };

  const handleSave = () => {
    // Basic validation
    const emptyStaff = rows.filter(r => r.staffNo.trim() === '');
    if (emptyStaff.length === rows.length) {
      triggerToast('Cannot save. Grid is completely empty.', 'error');
      return;
    }

    const invalidAmt = rows.filter(r => r.staffNo.trim() !== '' && (Number(r.advAmt) <= 0 || isNaN(r.advAmt)));
    if (invalidAmt.length > 0) {
      triggerToast('Validation Alert: Some records have zero or invalid Advance Amounts.', 'error');
      return;
    }

    triggerToast(`Data synchronized! ${rows.filter(r => r.staffNo.trim() !== '').length} employee records saved successfully to Maruti database.`, 'success');
  };

  const handleExportCSV = () => {
    const activeRows = rows.filter(r => r.staffNo.trim() !== '');
    if (activeRows.length === 0) {
      triggerToast('No active records to export.', 'error');
      return;
    }

    const headers = ['StaffNo', 'Name', 'Level', 'AdvAmt', 'Status'];
    const csvRows = [
      headers.join(','),
      ...activeRows.map(row => 
        [row.staffNo, `"${row.name}"`, row.level, row.advAmt, row.status].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `maruti_advance_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast('CSV report generated and downloaded successfully.', 'success');
  };

  const isRetro = theme === 'retro';
  const isDark = theme === 'modern-dark';

  // Make sure Retro mode forces tab to Annual Advance (matching layout)
  const currentTab = isRetro ? 'annual-advance' : activeTab;

  return (
    <div className={`min-h-screen flex flex-col relative select-none ${
      isRetro 
        ? 'retro-screen retro-scanlines p-3' 
        : isDark
        ? 'text-slate-100 font-sans'
        : 'text-slate-900 font-sans'
    }`}>
      
      {/* Top Header */}
      <Header theme={theme} setTheme={setTheme} />

      {/* Main Area */}
      <div className={`flex flex-1 ${isRetro ? 'flex-col' : 'flex-row'}`}>
        
        {/* Navigation Sidebar */}
        <Sidebar theme={theme} activeTab={currentTab} setActiveTab={setActiveTab} />

        {/* Workspace Container */}
        <main className={`flex-1 flex flex-col ${
          isRetro 
            ? 'p-0.5 mt-2' 
            : 'px-6 py-8 max-w-7xl mx-auto w-full space-y-6'
        }`}>
          
          {/* Active Tab Router */}
          {currentTab === 'dashboard' && !isRetro ? (
            // Gorgeous Analytics Dashboard (WOW factor)
            <div className="space-y-6 animate-slide-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">System Analytics Overview</h2>
                  <p className="text-xs text-slate-400 mt-1">Real-time payment indicators and employee advance request summaries.</p>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-semibold rounded-full uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5" /> LIVE REFRESHING
                </span>
              </div>

              {/* Live Metric Stats */}
              <DashboardStats theme={theme} rows={rows} />

              {/* Data Visualization Mock charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chart 1: Advance Distribution by Level */}
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-200/5 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/5 pb-3">
                    <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                      <TrendingUp className="h-4.5 w-4.5 text-blue-400" />
                      Advance Request Total by Grade Level
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">INR (₹)</span>
                  </div>
                  
                  <div className="space-y-3.5 pt-2">
                    {['L7', 'L6', 'L5', 'L4', 'L3', 'L2'].map((lvl) => {
                      const levelRows = rows.filter(r => r.level === lvl && r.staffNo.trim() !== '');
                      const totalAmt = levelRows.reduce((sum, r) => sum + (Number(r.advAmt) || 0), 0);
                      // Calculate percentage relative to a reasonable max like 40000
                      const percent = Math.min((totalAmt / 40000) * 100, 100);

                      return (
                        <div key={lvl} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300">Grade Level {lvl}</span>
                            <span className="text-white font-mono">₹{totalAmt.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                            <div 
                              style={{ width: `${percent}%` }}
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart 2: Status Breakdown and Logs */}
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-200/5 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/5 pb-3">
                    <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                      <BarChart3 className="h-4.5 w-4.5 text-emerald-400" />
                      Status Distribution Analysis
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">Count</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {['Approved', 'Pending', 'Rejected', 'Disbursed'].map((st) => {
                      const count = rows.filter(r => r.status === st && r.staffNo.trim() !== '').length;
                      const total = rows.filter(r => r.staffNo.trim() !== '').length || 1;
                      const percent = Math.round((count / total) * 100);

                      return (
                        <div key={st} className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">{st}</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-extrabold text-white">{count}</span>
                            <span className="text-[10px] text-slate-500 font-mono">({percent}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mt-1.5">
                            <div 
                              style={{ width: `${percent}%` }}
                              className={`h-full rounded-full ${
                                st === 'Approved' ? 'bg-emerald-500' :
                                st === 'Rejected' ? 'bg-rose-500' :
                                st === 'Disbursed' ? 'bg-cyan-500' : 'bg-amber-500'
                              }`}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick System Log Notification */}
                  <div className="mt-2 p-3 bg-slate-950/20 rounded-xl border border-slate-850 flex gap-2 text-[10.5px] text-slate-400 leading-relaxed">
                    <Info className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-300">Database Sync Info:</span> Any edits, additions, or status shifts performed in the <span className="underline text-blue-400 cursor-pointer font-bold" onClick={() => setActiveTab('annual-advance')}>Annual Advance tab</span> will instantly recalculate these analytics metrics.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            // Annual Advance Table Entry View (Standard Layout)
            <div className={`flex flex-col ${
              isRetro 
                ? 'border-2 border-[#1e2e3d] bg-[#dfddd5] p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                : 'space-y-4'
            }`}>
              
              {/* Dynamic Retro Layout Header components */}
              {isRetro && (
                <div className="flex border-b border-[#1e2e3d] pb-1.5 mb-1.5">
                  <Sidebar theme={theme} activeTab={currentTab} setActiveTab={setActiveTab} />
                </div>
              )}

              {/* Statistics (Only in Modern view) */}
              {!isRetro && <DashboardStats theme={theme} rows={rows} />}

              {/* Table Toolbar / Search (Only in Modern Mode) */}
              {!isRetro && (
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search Staff, Name, Level, Status..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-9.5 pr-4 py-2 border rounded-xl text-xs transition-all outline-none ${
                        isDark 
                          ? 'bg-slate-900/50 border-slate-850 text-white placeholder-slate-550 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 font-medium">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    Enter StaffNo to autofill employee record
                  </div>
                </div>
              )}

              {/* Table Component */}
              <AdvanceTable 
                theme={theme} 
                rows={rows} 
                setRows={setRows} 
                searchQuery={isRetro ? '' : searchQuery} 
              />

              {/* Table Controls (Add, Save, Reset, CSV Export) */}
              <Controls
                theme={theme}
                onAddRow={handleAddRow}
                onReset={handleReset}
                onSave={handleSave}
                onExportCSV={handleExportCSV}
              />
            </div>
          )}

        </main>
      </div>

      {/* Retro scanline flicker simulation overlay for Retro mode */}
      {isRetro && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,_transparent_65%,_rgba(0,0,0,0.15))]"></div>
      )}

      {/* Global Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          theme={theme}
        />
      )}
    </div>
  );
}
