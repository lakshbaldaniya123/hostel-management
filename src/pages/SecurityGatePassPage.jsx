import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { GatePassContext } from '../context/GatePassContext';
import { LeaveContext } from '../context/LeaveContext';

export default function SecurityGatePassPage() {
  const { gatePasses, markReturn } = useContext(GatePassContext);
  const { leaves } = useContext(LeaveContext);

  // Group 1: Short Term Gate Passes (excluding Returned)
  const activeGatePasses = gatePasses.filter(req => 
    req.status === 'Pending' || req.status === 'Approved' || req.status === 'Out of Campus' || req.status === 'Rejected'
  );

  // Group 2: Long Term Leaves (read-only tracking)
  const activeLeaves = leaves.filter(req => 
    req.status === 'Pending' || req.status === 'Approved' || req.status === 'Rejected'
  );

  // Group 3: History Log of Returned Gate Passes
  const exitLogs = gatePasses.filter(req => req.status === 'Returned');

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Security" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-slate-700 to-gray-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
            <div className="relative z-10 w-full">
               <span className="text-yellow-400 font-black tracking-widest text-[10px] uppercase mb-1 block">Unified Tracking Dashboard</span>
               <h1 className="text-3xl font-extrabold tracking-tight mb-2">Gate Pass & Leave Monitor</h1>
               <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                 Monitor short-term market exits and official long-term home leaves. Short-term passes allow you to verify entry upon return. Long-term leaves are read-only tracking lists managed strictly by the Warden.
               </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* ── COLUMN 1: Daily Gate Passes (Short Term) ── */}
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-3xl shadow-sm border border-indigo-100 flex flex-col h-full">
                <div className="px-6 py-6 border-b border-indigo-50 bg-indigo-50/20">
                  <h2 className="text-xl font-bold text-indigo-900 flex items-center justify-between">
                     Daily Gate Passes
                     <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-lg border border-indigo-200">{activeGatePasses.length} Active</span>
                  </h2>
                  <p className="text-xs text-indigo-600/70 mt-2">Short term exits (Market, Coaching, etc). Verify student entry upon return.</p>
                </div>
                
                <div className="p-4 sm:p-6 flex-1 overflow-y-auto max-h-[600px] space-y-4">
                  {activeGatePasses.length === 0 ? (
                    <div className="py-12 text-center text-indigo-300 border-2 border-dashed border-indigo-50 rounded-2xl flex flex-col items-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      <p className="font-semibold text-sm">No active gate passes.</p>
                    </div>
                  ) : (
                    activeGatePasses.map(req => (
                      <div key={req.id} className={`p-5 rounded-2xl border-2 transition-colors flex flex-col gap-4 ${
                         req.status === 'Approved' ? 'border-emerald-200 bg-emerald-50/40' : 
                         req.status === 'Out of Campus' ? 'border-amber-200 bg-amber-50/40' :
                         req.status === 'Rejected' ? 'border-red-100 bg-red-50/30' :
                         'border-gray-200 bg-gray-50/50'
                      }`}>
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{req.roomNo || req.room}</span>
                            <h4 className="font-bold text-gray-900 text-xl">{req.name || req.studentName}</h4>
                          </div>
                          
                          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                             req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                             req.status === 'Out of Campus' ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' :
                             req.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                             'bg-gray-200 text-gray-700 border-gray-300 flex items-center gap-1.5'
                           }`}>
                             {req.status === 'Pending' ? (
                               <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Warden Lock</>
                             ) : req.status === 'Approved' ? 'Authorized (Outside)' : req.status}
                           </span>
                        </div>
                        
                        <div className="bg-white/60 p-3 rounded-xl border border-white/50 text-xs shadow-sm">
                          <p className="font-bold text-gray-800 mb-1">Pass Info:</p>
                          <p className="text-gray-600"><span className="font-semibold">Destination:</span> {req.destination || req.purpose}</p>
                          {req.dates && <p className="text-gray-600 mt-0.5"><span className="font-semibold">Dates:</span> {req.dates}</p>}
                        </div>

                        {/* Security ACTION BUTTON ONLY ALLOWED FOR VERIFY ENTRY */}
                        {(req.status === 'Approved' || req.status === 'Out of Campus') && (
                          <button onClick={() => markReturn(req.id)} className="w-full px-4 py-3 mt-1 bg-gray-900 text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors shadow-md flex justify-center items-center gap-2">
                            Verify Entry ↵
                          </button>
                        )}
                        
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>


            {/* ── COLUMN 2: Long Term Leaves ── */}
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-3xl shadow-sm border border-teal-100 flex flex-col h-full">
                <div className="px-6 py-6 border-b border-teal-50 bg-teal-50/20">
                  <h2 className="text-xl font-bold text-teal-900 flex items-center justify-between">
                     Long-Term Leaves
                     <span className="bg-teal-100 text-teal-800 text-xs px-2.5 py-1 rounded-lg border border-teal-200">{activeLeaves.length} Active</span>
                  </h2>
                  <p className="text-xs text-teal-600/70 mt-2">Official departures (Home, Holidays). Read-only list managed by Warden.</p>
                </div>
                
                <div className="p-4 sm:p-6 flex-1 overflow-y-auto max-h-[600px] space-y-4">
                  {activeLeaves.length === 0 ? (
                    <div className="py-12 text-center text-teal-300 border-2 border-dashed border-teal-50 rounded-2xl flex flex-col items-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-3"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      <p className="font-semibold text-sm">No active long-term leaves.</p>
                    </div>
                  ) : (
                    activeLeaves.map(req => (
                      <div key={req.id} className={`p-5 rounded-2xl border-2 transition-colors flex flex-col gap-4 ${
                         req.status === 'Approved' ? 'border-teal-200 bg-teal-50/30' : 
                         req.status === 'Rejected' ? 'border-red-100 bg-red-50/30' :
                         'border-gray-200 bg-gray-50/50'
                      }`}>
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{req.roomNo}</span>
                            <h4 className="font-bold text-gray-900 text-xl">{req.studentName}</h4>
                          </div>
                          
                          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                             req.status === 'Approved' ? 'bg-teal-100 text-teal-800 border-teal-300' :
                             req.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                             'bg-gray-200 text-gray-700 border-gray-300 flex items-center gap-1.5'
                           }`}>
                             {req.status === 'Pending' ? (
                               <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Warden Lock</>
                             ) : req.status === 'Approved' ? 'Out on Leave' : req.status}
                           </span>
                        </div>
                        
                        <div className="bg-white/60 p-3 rounded-xl border border-white/50 text-xs shadow-sm">
                          <p className="font-bold text-gray-800 mb-1">Leave Info:</p>
                          <p className="text-gray-600"><span className="font-semibold">Reason:</span> {req.leaveReason}</p>
                          <p className="text-gray-600 mt-0.5"><span className="font-semibold">Duration:</span> {new Date(req.startDate).toLocaleDateString()} to {new Date(req.endDate).toLocaleDateString()}</p>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* ── ROW 2: Return Logs (Optional History) ── */}
          <div className="mt-4 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 inline-flex w-full justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Historical Return Logs (Short Term)</h2>
              <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 border rounded-lg shadow-sm">Auto-Synced</span>
            </div>
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs uppercase bg-gray-50 text-gray-400 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Student</th>
                    <th className="px-6 py-3 font-semibold">Destination / Reason</th>
                    <th className="px-6 py-3 font-semibold text-right">Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  {exitLogs.length === 0 ? (
                     <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 font-medium">No returned logs yet.</td></tr>
                  ) : (
                    exitLogs.map(req => (
                      <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{req.name || req.studentName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Room {req.roomNo || req.room}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-medium text-gray-700 max-w-[200px] truncate">{req.destination || req.purpose}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Entry Verified
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
