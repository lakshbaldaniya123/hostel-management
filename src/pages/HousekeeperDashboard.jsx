import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MaintenanceContext } from '../context/MaintenanceContext';
import { useAuth } from '../context/AuthContext';

export default function HousekeeperDashboard() {
  const { requests } = useContext(MaintenanceContext);
  const { currentUser } = useAuth();
  
  const housekeeperName = currentUser?.name || 'Housekeeper';
  const assignedBlock = currentUser?.block;

  // Filter requests logically restricted to their physical assigned block
  const cleaningRequests = requests.filter(r => 
    r.issueType === 'Cleaning' && r.roomNo && r.roomNo.startsWith(assignedBlock)
  );

  const [activeTab, setActiveTab] = useState('Pending');

  const pendingCount = cleaningRequests.filter(r => r.status !== 'Completed').length;
  const filteredRequests = cleaningRequests.filter(r => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return r.status !== 'Completed';
    if (activeTab === 'Cleaned') return r.status === 'Completed';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Housekeeper" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto mt-16 md:mt-0">
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
            <div className="text-right">
              <span className="text-sm font-medium text-gray-600 block">Hi, {housekeeperName}</span>
              <span className="text-xs font-bold text-teal-600">Assigned: Block {assignedBlock}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shadow-sm">🧹</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-3xl font-bold text-gray-900">{pendingCount}</div>
            <h2 className="text-sm font-medium text-gray-500 mt-1">Pending Cleaning Requests</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-3xl font-bold text-gray-900">{cleaningRequests.filter(r => r.status === 'Completed').length}</div>
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
                    <td className="px-6 py-4"><span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">{req.roomNo}</span></td>
                    <td className="px-6 py-4 text-gray-700">{req.studentName}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(req.registeredAt).toLocaleDateString('en-GB')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold ${req.status === 'Completed' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'} rounded-full`}>
                        {req.status === 'Completed' ? 'Cleaned' : 'Awaiting Review'}
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
