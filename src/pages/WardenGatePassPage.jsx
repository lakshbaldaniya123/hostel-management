import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function WardenGatePassPage({ fixedRole = "Warden" }) {
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

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role={fixedRole} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
            <div className="relative z-10 w-full">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Out-Pass Control</h1>
              <p className="text-blue-200 text-sm md:text-base leading-relaxed max-w-xl">
                Review pending Gate Pass applications from students. Approve or Reject campus departure requests securely.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Leave Requests</h2>
            
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="font-semibold text-sm">No gate pass requests to review.</p>
                </div>
              ) : (
                requests.map(req => (
                  <div key={req.id} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{req.name}</h4>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest mt-0.5 block">Room: {req.room}</span>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${
                          req.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                          req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                         <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Destination</span>
                            <span className="text-sm font-semibold text-gray-800">{req.destination}</span>
                         </div>
                         <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Dates</span>
                            <span className="text-sm font-semibold text-gray-800">{req.dates}</span>
                         </div>
                      </div>

                      <p className="text-sm font-medium text-gray-600 bg-white italic border-l-4 border-indigo-500 pl-3 py-1">
                        "{req.reason}"
                      </p>
                    </div>

                    <div className="flex md:flex-col gap-3 w-full md:w-32 shrink-0 border-t border-gray-100 md:border-0 pt-4 md:pt-0">
                      {req.status === 'Pending' ? (
                        <>
                          <button onClick={() => updateRequestStatus(req.id, 'Approved')} className="flex-1 px-4 py-3 bg-green-50 text-green-700 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors border border-green-200">
                            Approve
                          </button>
                          <button onClick={() => updateRequestStatus(req.id, 'Rejected')} className="flex-1 px-4 py-3 bg-red-50 text-red-700 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors border border-red-200">
                            Reject
                          </button>
                        </>
                      ) : (
                        <div className="text-center w-full bg-gray-50 py-3 rounded-xl border border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Processed
                        </div>
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
