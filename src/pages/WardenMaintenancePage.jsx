import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MaintenanceContext } from '../context/MaintenanceContext';

export default function WardenMaintenancePage() {
  const { requests, scheduleRequest, completeRequest } = useContext(MaintenanceContext);
  
  const [filterType, setFilterType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Date time scheduling state
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const filteredRequests = requests.filter(req => 
    filterType === 'All' ? true : req.status === filterType
  );

  const openScheduleModal = (req) => {
    setSelectedRequest(req);
    setScheduledDate('');
    setScheduledTime('');
    setModalOpen(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduledDate || !scheduledTime) return;
    scheduleRequest(selectedRequest.id, scheduledDate, scheduledTime);
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Warden" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hostel Maintenance Center</h1>
            <p className="text-sm text-gray-500 mt-2">
              Review student complaints and schedule repair times for maintenance staff.
            </p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Pending', 'Scheduled', 'Reschedule Requested', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterType(status)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  filterType === status 
                    ? 'bg-gray-900 text-white shadow-sm' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {status} 
                {status !== 'All' && <span className="ml-1.5 opacity-60">({requests.filter(r => r.status === status).length})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredRequests.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 font-medium">No maintenance complaints in this category.</div>
          )}
          {filteredRequests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 tracking-wider">ROOM {req.roomNo}</span>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mt-1">{req.issueType}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    req.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' :
                    req.status === 'Reschedule Requested' ? 'bg-red-100 text-red-700 animate-pulse' :
                    'bg-orange-100 text-orange-700 animate-pulse'
                  }`}>
                    {req.status === 'Reschedule Requested' ? 'Reschedule Req' : req.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                    {req.studentName.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{req.studentName} <span className="text-gray-400 font-normal">({req.studentId})</span></span>
                </div>

                {req.image && (
                  <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-100" style={{ maxHeight: '200px' }}>
                    <img src={req.image} alt="Issue" className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-5 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                  "{req.description}"
                </p>

                {req.status === 'Reschedule Requested' && (
                  <div className="mb-5 bg-red-50 border border-red-100 p-3 rounded-xl">
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1 shadow-sm block">Rejected By Student</p>
                    <p className="text-sm font-semibold text-red-800 mb-1">Reason: {req.rejectionReason}</p>
                    <p className="text-xs text-red-600 italic">Please allocate a new date and time.</p>
                  </div>
                )}

                {req.status === 'Scheduled' && (
                  <div className="mb-5 bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Repair Scheduled For</p>
                      <p className="text-sm font-bold text-indigo-900">{req.scheduledDate} at {req.scheduledTime}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-50 mt-4">
                {(req.status === 'Pending' || req.status === 'Reschedule Requested') && (
                  <button 
                    onClick={() => openScheduleModal(req)}
                    className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                  >
                    {req.status === 'Pending' ? 'Schedule Repair Time' : 'Re-Schedule Repair Time'}
                  </button>
                )}
                {req.status === 'Scheduled' && (
                  <button 
                    onClick={() => completeRequest(req.id)}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Mark as Completed
                  </button>
                )}
                {req.status === 'Completed' && (
                  <button disabled className="w-full py-3 bg-gray-50 text-green-700 rounded-xl text-sm font-bold border-2 border-green-100 cursor-not-allowed">
                     Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Scheduling Modal */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 bg-gray-900 text-white">
              <h3 className="text-xl font-bold">{selectedRequest.status === 'Reschedule Requested' ? 'Re-Schedule' : 'Schedule'} Maintenance</h3>
              <p className="text-sm text-gray-400 mt-1">Assign date & time for Ticket #{selectedRequest.id}</p>
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-5">
              
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                <span className="text-xs font-bold text-gray-500 block mb-1">ISSUE SUMMARY</span>
                <span className="text-sm font-semibold text-gray-900 block">{selectedRequest.issueType} - Room {selectedRequest.roomNo}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Scheduled Date</label>
                <input 
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={e => setScheduledDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Scheduled Time</label>
                <input 
                  type="time" 
                  required
                  value={scheduledTime}
                  onChange={e => setScheduledTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!scheduledDate || !scheduledTime}
                  className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors disabled:opacity-50"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
