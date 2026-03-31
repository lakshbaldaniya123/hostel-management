import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { ComplaintContext } from '../context/ComplaintContext';


export default function UserComplaintPage() {
  const { complaints, raiseComplaint } = useContext(ComplaintContext);
  
  const [activeTab, setActiveTab] = useState('lodge');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [description, setDescription] = useState('');

  // Filter complaints based on name and mobile to simulate user history
  const myComplaints = complaints.filter(c => c.name === name && c.mobile === mobile);
  const userTrackRecord = name && mobile ? myComplaints : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !description.trim() || !roomNo.trim()) return;

    raiseComplaint({ userType: 'Student', name, mobile, roomNo, description });
    setActiveTab('history');
    setDescription(''); 
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Student Helpdesk</h1>
              <p className="text-red-100 text-sm md:text-base leading-relaxed">
                Log a grievance or alert us of an issue. The Warden will review and resolve it promptly.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 right-32 w-48 h-48 bg-rose-400 opacity-20 rounded-full blur-2xl translate-y-1/4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex">
            <button 
              onClick={() => setActiveTab('lodge')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'lodge' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Lodge a Complaint
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'history' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              My Track Record
            </button>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 transition-shadow">
            {activeTab === 'lodge' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center justify-between mb-2">
                   <div className="flex items-center gap-3">
                     <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold">
                       {(name || 'S').charAt(0).toUpperCase()}
                     </span>
                     <span className="text-sm font-bold text-red-900">Student Account</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Lakshya B."
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-red-500 focus:ring-0 outline-none transition-colors bg-white text-gray-900" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Mobile Number</label>
                    <input 
                      type="tel" 
                      required
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-red-500 focus:ring-0 outline-none transition-colors bg-white text-gray-900" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Room Number</label>
                  <input 
                    type="text" 
                    required
                    value={roomNo}
                    onChange={e => setRoomNo(e.target.value)}
                    placeholder="e.g. 305"
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-red-500 focus:ring-0 outline-none transition-colors bg-white text-gray-900" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Incident Description</label>
                  <textarea 
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Clearly detail what happened..."
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-red-500 focus:ring-0 outline-none transition-colors resize-none placeholder:font-normal placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!name || !mobile || !description || !roomNo}
                  className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  Submit Complaint
                </button>
              </form>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {(!name || !mobile) ? (
                  <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="font-semibold text-sm">Please log a complaint first to sync your history.</p>
                  </div>
                ) : userTrackRecord.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="font-semibold text-sm">No complaints found for {name} ({mobile}).</p>
                  </div>
                ) : (
                  userTrackRecord.map(req => (
                    <div key={req.id} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{new Date(req.registeredAt).toLocaleDateString()}</span>
                          <h4 className="font-bold text-gray-900 text-lg mt-0.5">Ticket #{req.id}</h4>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${
                          req.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 bg-gray-50 p-4 rounded-xl">
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
