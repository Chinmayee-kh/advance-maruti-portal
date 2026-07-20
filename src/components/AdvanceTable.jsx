import React, { useState, useRef, useEffect } from 'react';
import { employeeDatabase } from '../data/employees';
import { User, Shield, IndianRupee, Activity, HelpCircle, Trash2 } from 'lucide-react';

export default function AdvanceTable({ theme, rows, setRows, searchQuery }) {
  const isRetro = theme === 'retro';
  const isLight = theme === 'modern-light';
  const isDark = theme === 'modern-dark';
  
  // Track which cell is showing autocomplete suggestions
  const [activeSuggestionRowId, setActiveSuggestionRowId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionRef = useRef(null);

  // Close suggestion dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setActiveSuggestionRowId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle staff number input change
  const handleStaffNoChange = (rowId, val) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        // Find if it's a perfect match
        const emp = employeeDatabase.find(e => e.staffNo === val);
        return {
          ...row,
          staffNo: val,
          name: emp ? emp.name : row.name, // Keep existing name if typed
          level: emp ? emp.level : row.level // Keep existing level if typed
        };
      }
      return row;
    });
    setRows(updatedRows);

    // Provide autocomplete suggestions
    if (val.trim()) {
      const filtered = employeeDatabase.filter(e => 
        e.staffNo.startsWith(val) || e.name.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setActiveSuggestionRowId(rowId);
    } else {
      setSuggestions([]);
      setActiveSuggestionRowId(null);
    }
  };

  // Select an employee from autocomplete suggestions
  const selectEmployee = (rowId, emp) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          staffNo: emp.staffNo,
          name: emp.name,
          level: emp.level
        };
      }
      return row;
    });
    setRows(updatedRows);
    setActiveSuggestionRowId(null);
  };

  // Handle name change manually
  const handleNameChange = (rowId, val) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          name: val
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Handle level change manually
  const handleLevelChange = (rowId, val) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          level: val
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Handle amount change
  const handleAmtChange = (rowId, val) => {
    // Only numeric input allowed
    const numVal = val.replace(/[^0-9]/g, '');
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          advAmt: numVal ? parseInt(numVal, 10) : 0
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Handle status update
  const handleStatusChange = (rowId, statusVal) => {
    if (!statusVal) return;
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          status: statusVal
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Delete row (only in modern mode)
  const deleteRow = (rowId) => {
    setRows(rows.filter(row => row.id !== rowId));
  };

  // Filter rows based on search input from App.jsx
  const filteredRows = rows.filter(row => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      row.staffNo.toLowerCase().includes(query) ||
      row.name.toLowerCase().includes(query) ||
      row.level.toLowerCase().includes(query) ||
      row.status.toLowerCase().includes(query)
    );
  });

  // Retro render function
  if (isRetro) {
    return (
      <div className="w-full overflow-x-auto select-none mt-2 retro-font">
        <table className="w-full border-collapse text-left text-xs font-bold text-[#1e2e3d]">
          <thead>
            <tr className="border-b border-[#1e2e3d]">
              <th className="py-2 px-1 w-[13%] text-center uppercase tracking-wider">StaffNo</th>
              <th className="py-2 px-2 w-[35%] text-left uppercase tracking-wider">Name</th>
              <th className="py-2 px-2 w-[8%] text-center uppercase tracking-wider">Level</th>
              <th className="py-2 px-2 w-[12%] text-center uppercase tracking-wider">Adv. Amt</th>
              <th className="py-2 px-2 w-[16%] text-center uppercase tracking-wider">Status</th>
              <th className="py-2 px-2 w-[16%] text-center uppercase tracking-wider">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="h-9">
                {/* Staff No Column */}
                <td className="p-1 text-center relative">
                  <input
                    type="text"
                    value={row.staffNo}
                    onChange={(e) => handleStaffNoChange(row.id, e.target.value)}
                    className="w-full h-7 text-center font-bold px-1 text-xs retro-input-yellow uppercase focus:outline-none"
                    placeholder="---"
                    maxLength={10}
                  />
                  {activeSuggestionRowId === row.id && suggestions.length > 0 && (
                    <div 
                      ref={suggestionRef}
                      className="absolute left-0 right-0 z-50 mt-1 bg-white border-2 border-[#1e2e3d] text-left max-h-36 overflow-y-auto shadow-md text-[10px]"
                    >
                      {suggestions.map((emp) => (
                        <div
                          key={emp.staffNo}
                          onClick={() => selectEmployee(row.id, emp)}
                          className="px-2 py-1 hover:bg-[#eaa028] hover:text-white cursor-pointer border-b border-gray-100 last:border-0"
                        >
                          {emp.staffNo} - {emp.name}
                        </div>
                      ))}
                    </div>
                  )}
                </td>

                {/* Name Column */}
                <td className="p-1">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleNameChange(row.id, e.target.value)}
                    className="w-full h-7 text-left font-bold px-2 text-xs retro-input-green focus:outline-none"
                    placeholder="Name"
                  />
                </td>

                {/* Level Column */}
                <td className="p-1">
                  <input
                    type="text"
                    value={row.level}
                    onChange={(e) => handleLevelChange(row.id, e.target.value)}
                    className="w-full h-7 text-center font-bold text-xs retro-input-green focus:outline-none"
                    placeholder="Lvl"
                  />
                </td>

                {/* Adv Amt Column */}
                <td className="p-1">
                  <input
                    type="text"
                    value={row.advAmt === 0 ? '' : row.advAmt}
                    onChange={(e) => handleAmtChange(row.id, e.target.value)}
                    className="w-full h-7 text-center font-bold px-2 text-xs retro-input-yellow focus:outline-none"
                    placeholder="0"
                  />
                </td>

                {/* Status Column */}
                <td className="p-1">
                  <input
                    type="text"
                    value={row.status}
                    readOnly
                    className="w-full h-7 text-center font-bold text-xs retro-input-green focus:outline-none"
                    placeholder=" "
                  />
                </td>

                {/* Change Status Column */}
                <td className="p-1">
                  <select
                    value=""
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    className="w-full h-7 text-center font-bold text-xs retro-input-white focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled></option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                    <option value="Disbursed">Disbursed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Modern Theme Render (Tailwind CSS v4)
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border shadow-lg ${
      isLight 
        ? 'bg-white border-slate-200 shadow-slate-100/50' 
        : 'bg-slate-900/20 border-slate-200/5 backdrop-blur-md'
    }`}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className={`border-b font-bold text-xs uppercase tracking-wider ${
            isLight 
              ? 'border-slate-200 bg-slate-50 text-slate-500' 
              : 'border-slate-200/10 bg-slate-950/40 text-slate-400'
          }`}>
            <th className="py-4.5 px-4 w-[14%]">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Staff No</span>
            </th>
            <th className="py-4.5 px-4 w-[32%]">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Name</span>
            </th>
            <th className="py-4.5 px-4 w-[10%] text-center">Level</th>
            <th className="py-4.5 px-4 w-[15%] text-right">
              <span className="flex items-center justify-end gap-1.5"><IndianRupee className="h-3.5 w-3.5" /> Adv. Amt</span>
            </th>
            <th className="py-4.5 px-4 w-[15%] text-center">
              <span className="flex items-center justify-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Status</span>
            </th>
            <th className="py-4.5 px-4 w-[14%] text-center">
              <span className="flex items-center justify-center gap-1.5"><HelpCircle className="h-3.5 w-3.5" /> Action</span>
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-slate-200/5'}`}>
          {filteredRows.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                No matching records found. Use the controls below to add a row or reset search.
              </td>
            </tr>
          ) : (
            filteredRows.map((row) => (
              <tr 
                key={row.id} 
                className={`transition-colors duration-150 group ${
                  isLight ? 'hover:bg-slate-50/50' : 'hover:bg-slate-800/20'
                }`}
              >
                {/* Staff No */}
                <td className="p-3 relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={row.staffNo}
                      onChange={(e) => handleStaffNoChange(row.id, e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2 font-mono text-xs focus:ring-1 transition-all outline-none uppercase font-semibold ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-blue-600/30' 
                          : 'bg-slate-950/60 border-slate-800 text-white focus:border-blue-500 focus:ring-blue-500/30'
                      }`}
                      placeholder="Staff ID"
                      maxLength={10}
                    />
                    {activeSuggestionRowId === row.id && suggestions.length > 0 && (
                      <div 
                        ref={suggestionRef}
                        className={`absolute left-0 right-0 z-50 mt-1.5 border rounded-xl max-h-40 overflow-y-auto shadow-2xl p-1.5 space-y-0.5 text-xs animate-slide-in ${
                          isLight 
                            ? 'bg-white border-slate-250 text-slate-800' 
                            : 'bg-slate-900 border-slate-800 text-slate-200'
                        }`}
                      >
                        {suggestions.map((emp) => (
                          <div
                            key={emp.staffNo}
                            onClick={() => selectEmployee(row.id, emp)}
                            className={`px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors flex justify-between font-mono ${
                              isLight 
                                ? 'hover:bg-blue-50 hover:text-blue-700' 
                                : 'hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white'
                            }`}
                          >
                            <span>{emp.staffNo}</span>
                            <span className={`font-sans ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{emp.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>

                {/* Name */}
                <td className="p-3">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleNameChange(row.id, e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs transition-all outline-none font-semibold ${
                      isLight 
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-blue-600/30' 
                        : 'bg-slate-950/60 border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
                    }`}
                    placeholder="Employee Name"
                  />
                </td>

                {/* Level */}
                <td className="p-3 text-center">
                  <input
                    type="text"
                    value={row.level}
                    onChange={(e) => handleLevelChange(row.id, e.target.value)}
                    className={`w-full max-w-[80px] mx-auto text-center border rounded-xl px-2 py-2 text-xs transition-all outline-none font-bold ${
                      isLight 
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-blue-600/30' 
                        : 'bg-slate-950/60 border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
                    }`}
                    placeholder="Lvl"
                    maxLength={3}
                  />
                </td>

                {/* Adv. Amt */}
                <td className="p-3 text-right">
                  <div className="relative inline-block w-full max-w-[120px]">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">₹</span>
                    <input
                      type="text"
                      value={row.advAmt === 0 ? '' : row.advAmt}
                      onChange={(e) => handleAmtChange(row.id, e.target.value)}
                      className={`w-full border rounded-xl pl-6 pr-3 py-2 font-mono text-xs text-right focus:ring-1 transition-all outline-none font-semibold ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-blue-600/30' 
                          : 'bg-slate-950/60 border-slate-800 text-white focus:border-blue-500 focus:ring-blue-500/30'
                      }`}
                      placeholder="0"
                    />
                  </div>
                </td>

                {/* Status */}
                <td className="p-3 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                    row.status === 'Approved'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      : row.status === 'Rejected'
                      ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                      : row.status === 'Disbursed'
                      ? 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20'
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      row.status === 'Approved' ? 'bg-emerald-500' :
                      row.status === 'Rejected' ? 'bg-rose-500' :
                      row.status === 'Disbursed' ? 'bg-cyan-500' : 'bg-amber-500'
                    }`}></span>
                    {row.status || 'Pending'}
                  </span>
                </td>

                {/* Change Status & Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <select
                      value={row.status || 'Pending'}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      className={`border text-xs rounded-xl px-2 py-1.5 outline-none focus:ring-1 transition-all cursor-pointer font-medium ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-blue-600/30' 
                          : 'bg-slate-950/60 border-slate-850 hover:border-slate-700 text-slate-200 focus:ring-blue-500/30'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                      <option value="Disbursed">Disburse</option>
                    </select>

                    <button
                      onClick={() => deleteRow(row.id)}
                      title="Delete Row"
                      className={`p-1.5 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100 ${
                        isLight 
                          ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' 
                          : 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10'
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
