import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { GatePassContext } from '../context/GatePassContext';
import { useAuth } from '../context/AuthContext';

export default function StudentGatePassPage() {
  const { gatePasses, requestPass } = useContext(GatePassContext);
  const { currentUser } = useAuth();
  const studentName = currentUser?.name || 'Student';
  const roomNo = currentUser?.roomNo || '';
  
  const [activeTab, setActiveTab] = useState('apply');
  const [outDate, setOutDate] = useState('');
  const [outTime, setOutTime] = useState('');
  const [inDate, setInDate] = useState('');
  const [inTime, setInTime] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');

  const myRequests = gatePasses.filter(r => r.name === studentName || r.studentName === studentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!outDate || !outTime || !inDate || !inTime || !reason || !destination) return;

    requestPass(
      studentName,
      roomNo,
      `${outDate} ${outTime} to ${inDate} ${inTime}`,
      reason,
      currentUser?.hostelId,
      destination
    );

    setOutDate(''); setOutTime(''); setInDate(''); setInTime(''); setReason(''); setDestination('');
    setActiveTab('history');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Gate Pass Gateway</h1>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Apply for an out-pass to leave the campus. Your request will be reviewed by the Warden.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex">
            <button 
              onClick={() => setActiveTab('apply')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'apply' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Apply for Pass
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'history' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              My Out-Passes
            </button>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 transition-shadow">
            {activeTab === 'apply' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Out Date</label>
                      <input 
                        type="date" 
                        required
                        value={outDate}
                        onChange={e => setOutDate(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Out Time</label>
                      <input 
                        type="time" 
                        required
                        value={outTime}
                        onChange={e => setOutTime(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">In Date</label>
                      <input 
                        type="date" 
                        required
                        value={inDate}
                        onChange={e => setInDate(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">In Time</label>
                      <input 
                        type="time" 
                        required
                        value={inTime}
                        onChange={e => setInTime(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Destination</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors mb-6" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Reason</label>
                  <select
                    required
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-blue-500 focus:ring-0 outline-none transition-colors bg-white hover:border-blue-200 cursor-pointer"
                  >
                    <option value="" disabled>Select a reason...</option>
                    <option value="Coaching">Coaching</option>
                    <option value="Medical">Medical</option>
                    <option value="Salon">Salon</option>
                    <option value="Relative Meeting">Relative Meeting</option>
                    <option value="Go to Home">Go to Home</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={!outDate || !outTime || !inDate || !inTime || !reason || !destination}
                  className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  Submit Request
                </button>
              </form>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {myRequests.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="font-semibold text-sm">No gate pass requests found.</p>
                  </div>
                ) : (
                  myRequests.map(req => (
                    <div key={req.id} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Gate Pass Request</span>
                          <h4 className="font-bold text-gray-900 text-lg mt-0.5">{req.dates}</h4>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${
                          req.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                          req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 bg-gray-50 p-4 rounded-xl">
                        {req.reason}
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
