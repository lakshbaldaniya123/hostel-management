import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const initialRequests = [
  { id: 'REQ-101', room: '204', block: 'A', requestedBy: 'Lakshya Baldaniya', time: 'Today, 09:30 AM', status: 'Pending' },
  { id: 'REQ-102', room: '112', block: 'B', requestedBy: 'Aman Sharma', time: 'Today, 08:15 AM', status: 'Cleaned' },
  { id: 'REQ-103', room: '305', block: 'A', requestedBy: 'Karan Patel', time: 'Yesterday, 04:00 PM', status: 'Cleaned' }
];

export default function HousekeeperDashboard() {
  const [requests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('Pending');

  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const filteredRequests = requests.filter(r => activeTab === 'All' ? true : r.status === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Housekeeper" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Housekeeper Portal
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              View room cleaning requests. Status updates automatically when students confirm.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Hi, Ramesh</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shadow-sm">🧹</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-3xl font-bold text-gray-900">{pendingCount}</div>
            <h2 className="text-sm font-medium text-gray-500 mt-1">Pending Cleaning Requests</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'Cleaned').length}</div>
            <h2 className="text-sm font-medium text-gray-500 mt-1">Rooms Cleaned</h2>
          </div>

          <div className="bg-teal-600 rounded-2xl p-6 shadow-md text-white flex flex-col justify-between hover:bg-teal-700 cursor-pointer transition-colors">
            <h2 className="text-lg font-bold">Report Lost & Found</h2>
            <p className="text-teal-100 text-sm mt-2">Did you find an item while cleaning? Report it immediately.</p>
            <div className="mt-4 font-semibold text-sm flex items-center gap-2">
              Report Item <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </div>
        </div>

        {/* Requests Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 border-b border-gray-100 bg-gray-50/50 flex gap-6">
            {['Pending', 'Cleaned', 'All'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab} Requests
              </button>
            ))}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Request ID</th>
                  <th className="px-6 py-4 font-semibold">Room No.</th>
                  <th className="px-6 py-4 font-semibold">Requested By</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{req.id}</td>
                    <td className="px-6 py-4"><span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">{req.room} (Blk {req.block})</span></td>
                    <td className="px-6 py-4 text-gray-700">{req.requestedBy}</td>
                    <td className="px-6 py-4 text-gray-500">{req.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold ${req.status === 'Cleaned' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'} rounded-full`}>
                        {req.status === 'Pending' ? 'Awaiting Confirmation' : 'Cleaned'}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">No {activeTab.toLowerCase()} requests.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
