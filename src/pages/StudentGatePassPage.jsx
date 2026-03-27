import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const CURRENT_STUDENT = {
  name: 'Shyam',
  roomNo: '204'
};

export default function StudentGatePassPage() {
  const [activeTab, setActiveTab] = useState('apply');
  const [destination, setDestination] = useState('');
  const [outDate, setOutDate] = useState('');
  const [inDate, setInDate] = useState('');
  const [reason, setReason] = useState('');
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('gatePassRequests');
    if (saved) {
      const allReqs = JSON.parse(saved);
      setMyRequests(allReqs.filter(r => r.name === CURRENT_STUDENT.name));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !outDate || !inDate || !reason) return;

    const newReq = {
      id: Date.now(),
      name: CURRENT_STUDENT.name,
      room: CURRENT_STUDENT.roomNo,
      destination,
      dates: `${outDate} to ${inDate}`,
      reason,
      status: 'Pending',
      registeredAt: new Date().toISOString()
    };

    const saved = localStorage.getItem('gatePassRequests');
    const allReqs = saved ? JSON.parse(saved) : [];
    const updatedReqs = [newReq, ...allReqs];

    localStorage.setItem('gatePassRequests', JSON.stringify(updatedReqs));
    setMyRequests([newReq, ...myRequests]);
    
    setDestination(''); setOutDate(''); setInDate(''); setReason('');
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
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Destination City / Hometown</label>
                  <input 
                    type="text" 
                    required
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="Where are you going?"
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Out Date</label>
                    <input 
                      type="date" 
                      required
                      value={outDate}
                      onChange={e => setOutDate(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">In Date</label>
                    <input 
                      type="date" 
                      required
                      value={inDate}
                      onChange={e => setInDate(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-blue-500 focus:ring-0 outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Reason</label>
                  <textarea 
                    required
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={4}
                    placeholder="Why do you need to leave?"
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-blue-500 focus:ring-0 outline-none transition-colors resize-none placeholder:font-normal placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!destination || !outDate || !inDate || !reason}
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
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Travel to {req.destination}</span>
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
