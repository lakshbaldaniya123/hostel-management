import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { LeaveContext } from '../context/LeaveContext';

export default function StudentLeavePage() {
  const { leaves, addLeave } = useContext(LeaveContext);
  const [fromDate, setFromDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toDate, setToDate] = useState('');
  const [toTime, setToTime] = useState('');
  const [reason, setReason] = useState('');

  // Get current date and time for validation
  const now = new Date();
  // Adjust to local ISO date
  const todayDateStr = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  const currentTimeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // ONLY block form if there is an active APPROVED leave that has not expired
  const activeLeave = leaves.find(l => {
    if (l.status === 'Approved') {
      // Use robust string comparison (YYYY-MM-DD) instead of Date parsing
      if (l.toDate > todayDateStr) return true;
      if (l.toDate === todayDateStr && l.toTime > currentTimeStr) return true;
    }
    return false; // don't block for pending
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeLeave) return;

    // Validate logic
    if (new Date(`${fromDate}T${fromTime}`) >= new Date(`${toDate}T${toTime}`)) {
      alert("End date/time must be after the start date/time.");
      return;
    }

    const newLeave = {
      id: `LV-${Math.floor(1000 + Math.random() * 9000)}`,
      fromDate,
      fromTime,
      toDate,
      toTime,
      reason,
      status: 'Pending'
    };

    addLeave(newLeave);
    
    // Reset form //
    setFromDate('');
    setFromTime('');
    setToDate('');
    setToTime('');
    setReason('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Leave Application
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Apply for long leaves and track your application status.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Hi, Shyam</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shadow-sm">🎓</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Apply Form */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">New Leave Application</h2>
                  <p className="text-xs text-gray-500 mt-1">Fill the details to request leave</p>
                </div>
              </div>

              {activeLeave ? (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                  <div className="text-xl mb-2">⏳</div>
                  <h3 className="font-semibold text-orange-800 text-sm">You already have an active leave request</h3>
                  <p className="text-xs text-orange-600 mt-2 max-w-sm mx-auto">
                    You cannot apply for a new leave until your current <strong>{activeLeave.status}</strong> leave (until {activeLeave.toDate}) has ended or been rejected.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">From Date</label>
                      <input 
                        type="date" 
                        min={todayDateStr}
                        required
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">From Time</label>
                      <input 
                        type="time" 
                        min={fromDate === todayDateStr ? currentTimeStr : undefined}
                        required
                        value={fromTime}
                        onChange={e => setFromTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      />
                      {fromDate === todayDateStr && fromTime && fromTime < currentTimeStr && (
                        <p className="text-[10px] text-red-500 mt-1">Time cannot be in the past.</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">To Date</label>
                      <input 
                        type="date" 
                        min={fromDate || todayDateStr}
                        required
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">To Time</label>
                      <input 
                        type="time" 
                        required
                        value={toTime}
                        onChange={e => setToTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Reason for Leave</label>
                    <textarea 
                      required
                      placeholder="Please specify the exact reason..."
                      rows="3"
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={fromDate === todayDateStr && fromTime < currentTimeStr}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    Submit Leave Application
                  </button>
                </form>
              )}
            </div>
            
            {/* Notice Alert */}
            <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 border border-blue-100 text-sm text-blue-800">
              <span className="text-xl">ℹ️</span>
              <p>Your parents will be contacted by the Warden upon applying for a long leave. Ensure your parent's phone number is active.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Leave History */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-semibold text-gray-900">My Leave History</h3>
              </div>
              
              <div className="p-6 space-y-4 overflow-y-auto">
                {leaves.map((leave) => (
                  <div key={leave.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{leave.id}</span>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {leave.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <div className="text-xs text-gray-500 uppercase">Departure</div>
                        <div className="font-semibold text-gray-800">{leave.fromDate} <span className="text-gray-500 text-xs ml-1">{leave.fromTime}</span></div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase">Return</div>
                        <div className="font-semibold text-gray-800">{leave.toDate} <span className="text-gray-500 text-xs ml-1">{leave.toTime}</span></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2.5 rounded-lg text-xs text-gray-700 border border-gray-100">
                      <span className="font-semibold text-gray-500 mr-2">Reason:</span>
                      {leave.reason}
                    </div>
                  </div>
                ))}

                {leaves.length === 0 && (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    You have no leave history.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
