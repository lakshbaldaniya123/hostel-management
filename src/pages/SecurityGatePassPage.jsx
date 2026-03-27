import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function SecurityGatePassPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('gatePassRequests');
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  }, []);

  const updateRequestStatus = (id, newStatus) => {
    const updated = requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    localStorage.setItem('gatePassRequests', JSON.stringify(updated));
  };

  // Security only sees passes that are Approved (Ready to Check Out), Checked Out (Ready to Check In)
  const verifiableRequests = requests.filter(req => 
    req.status === 'Approved' || req.status === 'Checked Out'
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Security" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-slate-700 to-gray-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
            <div className="relative z-10 w-full">
               <span className="text-yellow-400 font-black tracking-widest text-[10px] uppercase mb-1 block">Live Gate Scanning</span>
               <h1 className="text-3xl font-extrabold tracking-tight mb-2">Gate Pass Verification</h1>
               <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                 Verify student credentials before they exit or enter the campus. Check out students who have an approved Warden pass, and check them back in when they return.
               </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
               Awaiting Verification <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-lg border border-gray-200">{verifiableRequests.length} Valid</span>
            </h2>
            
            <div className="space-y-4">
              {verifiableRequests.length === 0 ? (
                <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <p className="font-semibold text-sm">No students currently attempting to check out or return.</p>
                </div>
              ) : (
                verifiableRequests.map(req => (
                  <div key={req.id} className={`p-6 rounded-2xl border-2 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${req.status === 'Checked Out' ? 'border-amber-200 bg-amber-50/20' : 'border-emerald-200 bg-emerald-50/20'}`}>
                    
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Student Identify</span>
                        <h4 className="font-bold text-gray-900 text-2xl">{req.name}</h4>
                        <span className="text-sm font-bold text-indigo-600 mt-1 block px-2 py-0.5 bg-indigo-50 border border-indigo-100 w-fit rounded">Room: {req.room}</span>
                      </div>
                      
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Gate Pass Info</span>
                        <p className="font-bold text-gray-800 text-sm">Destination: {req.destination}</p>
                        <span className="text-xs font-semibold text-gray-500 block mt-1 border-l-2 border-gray-200 pl-2">{req.dates}</span>
                      </div>
                    </div>

                    <div className="flex w-full md:w-48 shrink-0 border-t border-gray-100 md:border-0 pt-4 md:pt-0 justify-end md:justify-center items-center flex-col gap-2">
                       <span className={`px-4 py-2 w-full text-center rounded-lg text-xs font-black uppercase tracking-widest border shadow-sm ${
                          req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300' 
                        }`}>
                          {req.status === 'Approved' ? 'Ready to Edit' : 'Currently Outside'}
                        </span>
                        
                      {req.status === 'Approved' && (
                        <button onClick={() => updateRequestStatus(req.id, 'Checked Out')} className="w-full px-4 py-3 mt-2 bg-gray-900 text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors shadow-lg">
                          Check Out 
                          <svg className="inline ml-2 -mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                      )}
                      
                      {req.status === 'Checked Out' && (
                         <button onClick={() => updateRequestStatus(req.id, 'Returned')} className="w-full px-4 py-3 mt-2 bg-white text-emerald-700 border-2 border-emerald-200 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-emerald-50 transition-colors shadow-md">
                          Verify Entry
                          <svg className="inline ml-2 -mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                      )}
                    </div>
                    
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
