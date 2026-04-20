import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/staff')
      .then(res => res.json())
      .then(data => {
        setStaff(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch staff data:', err);
        setLoading(false);
      });
  }, []);

  const wardens = staff.filter(s => s.role === 'Warden');
  const housekeepers = staff.filter(s => s.department === 'Housekeeper');
  const security = staff.filter(s => s.department === 'Security');

  return (
    <div className="flex bg-gray-50 font-sans text-gray-800" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar role="Admin" />
      
      <main className="flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <Topbar />
        
        <div className="p-8 overflow-y-auto" style={{ flex: 1 }}>
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-gray-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
              <div className="relative z-10 w-full">
                 <span className="text-emerald-400 font-black tracking-widest text-[10px] uppercase mb-1 block">Staff Directory Hub</span>
                 <h1 className="text-3xl font-extrabold tracking-tight mb-2">Hostel Staff Management</h1>
                 <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                   Access real-time database directories of all authorized Wardens, Security Officers, and Maintenance/Cleaning staff across all blocks.
                 </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20 text-gray-500 font-medium">Synced Loading from Database...</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* ── Warden Section ── */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shadow-sm">👨‍💼</div>
                      Wardens
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-lg font-bold border border-blue-200">
                      {wardens.length} Connected
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {wardens.length === 0 ? <p className="text-gray-400 text-sm">No Wardens found.</p> :
                      wardens.map(user => (
                        <div key={user._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{user.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">ID: {user.hostelId}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-0.5">Assigned</span>
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">Block {user.block || 'All'}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* ── Security Section ── */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shadow-sm">🛡️</div>
                      Security Guard
                    </h2>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-lg font-bold border border-amber-200">
                      {security.length} Connected
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {security.length === 0 ? <p className="text-gray-400 text-sm">No Security staff found.</p> :
                      security.map(user => (
                        <div key={user._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-600 text-lg">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{user.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">ID: {user.hostelId}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-0.5">Station</span>
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">Main Gate</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* ── Housekeeping Section ── */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-xl shadow-sm">🧹</div>
                      Housekeeping
                    </h2>
                    <span className="bg-teal-100 text-teal-800 text-xs px-2.5 py-1 rounded-lg font-bold border border-teal-200">
                      {housekeepers.length} Connected
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {housekeepers.length === 0 ? <p className="text-gray-400 text-sm">No Cleaning staff found.</p> :
                      housekeepers.map(user => (
                        <div key={user._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center font-bold text-teal-600 text-lg">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 max-w-[120px] truncate">{user.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">ID: {user.hostelId}</p>
                          </div>
                          <div className="text-center shrink-0">
                             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-0.5">Assigned</span>
                             <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">Block {user.block || 'None'}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
