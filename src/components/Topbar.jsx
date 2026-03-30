import React from 'react';

export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white px-8 py-4 shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-4 w-1/2">
        <div className="text-gray-400 cursor-pointer hidden md:block">
          {/* Sidebar Toggle or Sidebar Icon placeholder */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="3" x2="9" y2="21"/>
          </svg>
        </div>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors text-gray-700"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-semibold text-sm">
            s
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-800 leading-none">shyama</div>
            <div className="text-xs text-gray-500 mt-1 leading-none">Warden</div>
          </div>
        </div>
      </div>
    </div>
  );
}
