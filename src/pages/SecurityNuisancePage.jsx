import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { ComplaintContext } from '../context/ComplaintContext';
import { useAuth } from '../context/AuthContext';

export default function SecurityNuisancePage() {
  const { complaints, raiseComplaint } = useContext(ComplaintContext);
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('lodge');
  const [description, setDescription] = useState('');

  const userName = currentUser?.name || 'Security Guard';
  const userMobile = currentUser?.contact || 'N/A';
  const roleName = currentUser?.role || 'Security';

  const myComplaints = complaints.filter(c => c.name === userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    raiseComplaint({ 
      userType: roleName, 
      name: userName, 
      mobile: userMobile, 
      roomNo: 'Gate', // Assuming Gate for security
      description 
    });
    
    setActiveTab('history');
    setDescription(''); 
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Security" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Security & Nuisance Log</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Log unauthorized entries, property damage, or behavioral issues to alert the Warden.
              </p>
            </div>
            {/* Minimal aesthetic for Security */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute bottom-4 right-8 text-gray-800 opacity-50"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex">
            <button 
              onClick={() => setActiveTab('lodge')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'lodge' ? 'bg-yellow-500 text-yellow-950 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Report Nuisance
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'history' ? 'bg-yellow-500 text-yellow-950 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Security Log Hub
            </button>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 transition-shadow">
            {activeTab === 'lodge' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Officer on Duty</span>
                    <span className="text-sm font-bold text-gray-900">{userName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Contact</span>
                    <span className="text-sm font-bold text-gray-900">{userMobile}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Post</span>
                    <span className="text-sm font-bold text-gray-900">{roleName}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Detailed Report</label>
                  <textarea 
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Clearly detail what happened, who was involved, and exact time of occurrence..."
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-yellow-500 focus:ring-0 outline-none transition-colors resize-none placeholder:font-normal placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!description.trim()}
                  className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  File Nuisance Report
                </button>
              </form>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {myComplaints.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="font-semibold text-sm">No nuisance logged by you.</p>
                  </div>
                ) : (
                  myComplaints.map(req => (
                    <div key={req.id} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{new Date(req.registeredAt).toLocaleDateString()}</span>
                          <h4 className="font-bold text-gray-900 text-lg mt-0.5">Report #{req.id}</h4>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${
                          req.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {req.status === 'Resolved' ? 'Warden Reviewed' : 'Pending Warden'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        {req.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
            
          </div>

        </div>
      </main>
    </div>
  );
}
