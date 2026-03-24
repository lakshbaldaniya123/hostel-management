import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { LeaveContext } from '../context/LeaveContext';

export default function WardenLeavePage() {
  const { leaves: requests, updateLeaveStatus } = useContext(LeaveContext);
  const [activeTab, setActiveTab] = useState('Pending');

  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  
  const filteredRequests = requests.filter(r => 
    activeTab === 'All' ? true : r.status === activeTab
  );

  const handleUpdateStatus = (id, newStatus) => {
    updateLeaveStatus(id, newStatus);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Warden" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Leave Approvals
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Review student leave requests. Please verify with parents via phone before approving long leaves.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Hi, Warden</span>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl shadow-sm">🧑‍💼</div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 flex items-center gap-5">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{pendingCount}</div>
              <h2 className="text-sm font-medium text-gray-500 mt-1">Pending Requests</h2>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'Approved').length}
              </div>
              <h2 className="text-sm font-medium text-gray-500 mt-1">Total Approved</h2>
            </div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col justify-center">
            <p className="text-sm text-indigo-800 font-medium">Standard Protocol</p>
            <p className="text-xs text-indigo-600 mt-2">
              All long leaves &gt; 3 days require explicit telephonic confirmation from the registered parent's number before pressing "Approve".
            </p>
          </div>
        </div>

        {/* Requests Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="px-6 border-b border-gray-100 bg-gray-50/50 flex gap-6">
            {['Pending', 'Approved', 'Rejected', 'All'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold w-64">Student Details</th>
                  <th className="px-6 py-4 font-semibold w-72">Leave Schedule</th>
                  <th className="px-6 py-4 font-semibold min-w-[200px]">Reason</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    
                    {/* Student Details */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-base">{req.studentName}</div>
                      <div className="text-indigo-600 font-medium text-xs mt-1">Room: {req.roomNo}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-3 p-1.5 bg-gray-100 rounded-lg inline-flex border border-gray-200">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.06 6.06l.98-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Parent: <a href={`tel:${req.parentPhone}`} className="text-blue-600 hover:underline">{req.parentPhone}</a>
                      </div>
                    </td>

                    {/* Leave Schedule */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-12 text-xs font-semibold text-gray-400 uppercase tracking-wider">Out:</span>
                          <span className="font-medium text-gray-800">{req.fromDate}</span>
                          <span className="text-gray-500 text-xs">at {req.fromTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-12 text-xs font-semibold text-gray-400 uppercase tracking-wider">In:</span>
                          <span className="font-medium text-gray-800">{req.toDate}</span>
                          <span className="text-gray-500 text-xs">at {req.toTime}</span>
                        </div>
                      </div>
                    </td>

                    {/* Reason */}
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-700 leading-relaxed max-w-sm">
                        {req.reason}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex flex-col gap-2 items-end">
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'Approved')}
                            className="px-3 py-1.5 w-24 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'Rejected')}
                            className="px-3 py-1.5 w-24 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleUpdateStatus(req.id, 'Pending')}
                          className="text-gray-400 hover:text-indigo-600 text-xs underline"
                        >
                          Reset Status
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
                
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                      No {activeTab.toLowerCase()} requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
