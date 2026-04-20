import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { GymContext } from '../context/GymContext';

export default function WardenGymPage({ fixedRole = "Warden" }) {
  const { subscriptions, markFeePaid } = useContext(GymContext);
  const [activeTab, setActiveTab] = useState('fees');

  const handleMarkFeePaid = async (id) => {
    if (!window.confirm("Confirm ₹ transaction received from student?")) return;
    await markFeePaid(id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role={fixedRole} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Gymnasium Oversight</h1>
              <p className="text-teal-100 text-sm md:text-base leading-relaxed">
                Approve pending monthly fees and check who is using personal trainers.
              </p>
            </div>
            
            {/* Quick Metrics */}
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-teal-200 mb-1">Total Enrolled</div>
                  <div className="text-3xl font-black">{subscriptions.length}</div>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-teal-200 mb-1">Pending Fees</div>
                  <div className="text-3xl font-black">{subscriptions.filter(s => s.paymentStatus === 'Pending').length}</div>
               </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('fees')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'fees' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Memberships & Fees
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            
            {/* --- MEMBERSHIP / FEES TAB --- */}
            {activeTab === 'fees' && (
              <>
                 <h2 className="text-xl font-bold text-gray-900 mb-6">Student Enrollment Roster</h2>
                 
                 <div className="space-y-4">
                  {subscriptions.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                      <p className="font-semibold text-sm">No students have enrolled in a gym membership yet.</p>
                    </div>
                  ) : (
                    subscriptions.map(sub => (
                      <div key={sub.id} className={`p-6 rounded-2xl border-2 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${sub.paymentStatus === 'Pending' ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100 hover:border-emerald-100'}`}>
                        
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Student</span>
                            <h4 className="font-bold text-gray-900 text-lg">{sub.name}</h4>
                            <span className="text-xs font-semibold text-gray-500 mt-0.5 block">Room {sub.room}</span>
                          </div>
                          
                          <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Enrolled Plan</span>
                            <div className="flex items-center gap-2">
                               <p className={`font-black text-sm ${sub.plan.includes('Premium') ? 'text-indigo-700' : 'text-emerald-700'}`}>
                                 {sub.plan}
                               </p>
                               {sub.plan.includes('Premium') && (
                                 <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-indigo-200">
                                   + Personal Trainer
                                 </span>
                               )}
                            </div>
                            <span className="text-xs font-medium text-gray-500 block mt-1 border-l-2 border-gray-200 pl-2">
                               Fee: <b className="text-gray-900">₹{sub.fee}</b>
                            </span>
                          </div>
                        </div>

                        <div className="flex w-full md:w-32 shrink-0 border-t border-gray-100 md:border-0 pt-4 md:pt-0 justify-end md:justify-center items-center flex-col gap-2">
                          <span className={`px-3 py-1.5 w-full text-center rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                              sub.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                            }`}>
                              {sub.paymentStatus === 'Pending' ? 'Dues Pending' : 'Paid in Full'}
                            </span>
                          
                          {sub.paymentStatus === 'Pending' && (
                            <button onClick={() => handleMarkFeePaid(sub.id)} className="w-full px-4 py-2 mt-2 bg-gray-900 text-white rounded-xl text-[10px] uppercase font-bold hover:bg-black transition-colors shadow-sm">
                              Mark Paid
                            </button>
                          )}
                        </div>
                        
                      </div>
                    ))
                  )}
                 </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
