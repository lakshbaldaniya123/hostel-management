import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MaintenanceContext } from '../context/MaintenanceContext';
import { useAuth } from '../context/AuthContext';


export default function WardenMaintenancePage() {
  const { requests, scheduleRequest } = useContext(MaintenanceContext);
  const { currentUser } = useAuth();

  const [viewMode, setViewMode] = useState('list');
  const [reportFilter, setReportFilter] = useState('Month');
  const [filterType, setFilterType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRoomAnalytics, setSelectedRoomAnalytics] = useState(null);
  const [selectedIssueCategory, setSelectedIssueCategory] = useState(null);

  // Date time scheduling state
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  // Filter requests to ONLY show rooms from the Warden's assigned block matching their prefix
  const applicableRequests = requests.filter(req => {
     if (!currentUser?.block) return true;
     return req.roomNo && req.roomNo.startsWith(currentUser.block);
  });

  const filteredRequests = applicableRequests.filter(req =>
    filterType === 'All' ? true : req.status === filterType
  );

  // Organize analytics data
  const roomAnalytics = applicableRequests.reduce((acc, req) => {
    if (!acc[req.roomNo]) acc[req.roomNo] = [];
    acc[req.roomNo].push(req);
    return acc;
  }, {});

  const roomKeys = Object.keys(roomAnalytics).sort((a, b) => a.localeCompare(b));

  // New data aggregation for Issue Categories
  const issueAnalytics = applicableRequests.reduce((acc, req) => {
    if (!acc[req.issueType]) acc[req.issueType] = {};
    if (!acc[req.issueType][req.roomNo]) acc[req.issueType][req.roomNo] = 0;
    acc[req.issueType][req.roomNo]++;
    return acc;
  }, {});
  const issueTypes = Object.keys(issueAnalytics).sort((a, b) => a.localeCompare(b));

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hostel Maintenance Center</h1>
            <p className="text-sm text-gray-500 mt-2">
              Review student complaints and schedule repair times for maintenance staff.
            </p>
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'report' : 'list')}
            className={`px-8 py-4 rounded-2xl text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-4 flex items-center gap-3 ${viewMode === 'list'
                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-indigo-400'
                : 'bg-white text-indigo-700 border-indigo-200 hover:bg-gray-50'
              }`}
          >
            {viewMode === 'list' ? '📊 VIEW ANALYTICS REPORTS' : '⬅ BACK TO COMPLAINTS'}
          </button>
        </div>

        {/* Filters */}
        {viewMode === 'list' && (
          <div className="flex gap-2 overflow-x-auto pb-6 items-center">
            {['All', 'Pending', 'Scheduled', 'Reschedule Requested', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterType(status)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filterType === status
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                {status}
                {status !== 'All' && <span className="ml-1.5 opacity-60">({requests.filter(r => r.status === status).length})</span>}
              </button>
            ))}
          </div>
        )}

        {/* Analytics Report UI */}
        {viewMode === 'report' ? (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[60vh]">
            {!selectedRoomAnalytics ? (
              <>
                <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Room Maintenance Profiles</h2>
                    <p className="text-sm text-gray-500 mt-1">Select a room to view its complete maintenance history and tracking.</p>
                  </div>
                </div>

                {roomKeys.length === 0 ? (
                  <div className="py-20 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-3xl">No rooms with maintenance history.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {roomKeys.map(room => {
                      const reqs = roomAnalytics[room];
                      const total = reqs.length;
                      const pendingCount = reqs.filter(r => r.status !== 'Completed').length;

                      return (
                        <button
                          key={room}
                          onClick={() => setSelectedRoomAnalytics(room)}
                          className="group relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-indigo-500 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                          <div className={`absolute top-0 w-full h-1.5 transition-colors ${pendingCount > 0 ? 'bg-orange-500' : 'bg-emerald-500 group-hover:bg-indigo-500'}`}></div>
                          <span className="text-4xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors drop-shadow-sm">{room}</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{total} Ticket{total !== 1 ? 's' : ''}</span>

                          {pendingCount > 0 && (
                            <div className="absolute top-3 right-3 w-3.5 h-3.5 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-200 border-2 border-white"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Issue Category Analysis Section */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Issue Category Analysis</h2>
                    <p className="text-sm text-gray-500 mt-1">Identify rooms with recurring problems based on maintenance categories.</p>
                  </div>

                  {issueTypes.length === 0 ? (
                    <div className="py-10 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-3xl">No issue data available.</div>
                  ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      {/* Little Boxes for Issue Types */}
                      <div className="w-full lg:w-1/3 flex flex-wrap gap-3">
                        {issueTypes.map(type => {
                          const isSelected = selectedIssueCategory === type;
                          const totalCases = Object.values(issueAnalytics[type]).reduce((a, b) => a + b, 0);
                          return (
                            <button
                              key={type}
                              onClick={() => setSelectedIssueCategory(type)}
                              className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-300 w-full sm:w-[calc(50%-0.375rem)] lg:w-full ${
                                isSelected 
                                  ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]' 
                                  : 'border-gray-100 bg-white hover:border-indigo-300 hover:shadow-sm hover:bg-indigo-50/30'
                              }`}
                            >
                              <span className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>{type}</span>
                              <span className={`text-[10px] font-black uppercase tracking-wider mt-1 ${isSelected ? 'text-indigo-500' : 'text-gray-400'}`}>
                                {totalCases} Total Case{totalCases !== 1 ? 's' : ''}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Display Rooms sorted descending for selected issue type */}
                      <div className="w-full lg:w-2/3">
                        {selectedIssueCategory ? (
                          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                              Highest occurrences for {selectedIssueCategory}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {Object.entries(issueAnalytics[selectedIssueCategory])
                                .sort(([, countA], [, countB]) => countB - countA)
                                .map(([roomNo, count], index) => (
                                  <div key={roomNo} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between hover:border-indigo-300 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-sm ${
                                        index === 0 ? 'bg-orange-100 text-orange-600 border border-orange-200' : 
                                        index === 1 ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 
                                        'bg-gray-100 text-gray-600 border border-gray-200'
                                      }`}>
                                        #{index + 1}
                                      </div>
                                      <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Room</div>
                                        <div className="text-lg font-black text-gray-900 leading-none">{roomNo}</div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-black text-indigo-900 leading-none">{count}</div>
                                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 min-w-[35px]">Times</div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center flex flex-col items-center justify-center h-full min-h-[200px]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-300 mb-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                            <span className="text-gray-500 font-medium">Select an issue category to view room breakdown.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setSelectedRoomAnalytics(null)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-bold flex items-center justify-center shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                  </button>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Room {selectedRoomAnalytics}</h2>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Maintenance Dossier</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block mb-1">Total Issues</span>
                    <span className="text-4xl font-black text-indigo-900">{roomAnalytics[selectedRoomAnalytics].length}</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest block mb-1">Unresolved</span>
                    <span className="text-4xl font-black text-orange-900">
                      {roomAnalytics[selectedRoomAnalytics].filter(r => r.status !== 'Completed').length}
                    </span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block mb-1">Completed</span>
                    <span className="text-4xl font-black text-emerald-900">
                      {roomAnalytics[selectedRoomAnalytics].filter(r => r.status === 'Completed').length}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    History Log
                  </h3>
                  {roomAnalytics[selectedRoomAnalytics].sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)).map(req => (
                    <div key={req.id} className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors flex flex-col md:flex-row justify-between gap-6 w-full">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-base font-black text-gray-900">{req.issueType}</span>
                          <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-md ${req.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                              req.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' :
                                req.status === 'Reschedule Requested' ? 'bg-red-100 text-red-700 animate-pulse' :
                                  'bg-orange-100 text-orange-700 border border-orange-200'
                            }`}>
                            {req.status}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 tracking-widest border border-gray-200 px-2 py-1 rounded-md">ID: {req.id}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 bg-gray-50/80 p-4 border border-gray-100 rounded-xl leading-relaxed w-full">
                          "{req.description}"
                        </p>
                      </div>
                      <div className="flex flex-col text-xs font-semibold text-gray-500 md:w-40 md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0 justify-center">
                        <div className="mb-1 uppercase tracking-widest text-[10px] font-black text-gray-400">Reported By</div>
                        <div className="text-gray-900 font-bold text-sm mb-3">{req.studentName}</div>
                        <div className="uppercase tracking-widest text-[10px] font-black text-gray-400 mb-1">Date</div>
                        <div className="text-gray-900 font-bold">{new Date(req.registeredAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
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
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${req.status === 'Completed' ? 'bg-green-100 text-green-700' :
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
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
                    <button disabled className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold border-2 border-indigo-100 cursor-not-allowed">
                      Wait for Student to Confirm Done
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
        )}
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
