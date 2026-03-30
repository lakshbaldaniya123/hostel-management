import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AdminMaintenancePage() {
  
  const maintenanceRequests = [
    {
      id: 'MR-001',
      priority: 'High',
      priorityColor: 'bg-[#dc2626] text-white',
      status: 'In Progress',
      statusColor: 'bg-[#f3f4f6] text-[#4b5563]',
      issue: 'Plumbing leak in bathroom',
      assigned: 'Maintenance Team A',
      room: 'B-205',
      reporter: 'Priya Patel',
      date: '2026-03-20',
    },
    {
      id: 'MR-002',
      priority: 'Medium',
      priorityColor: 'bg-white text-[#4b5563] border border-gray-200',
      status: 'Pending',
      statusColor: 'bg-white text-[#4b5563] border border-gray-200',
      issue: 'AC not cooling properly',
      assigned: '-',
      room: 'A-101',
      reporter: 'Rahul Sharma',
      date: '2026-03-19',
    },
    {
      id: 'MR-003',
      priority: 'Low',
      priorityColor: 'bg-white text-[#4b5563] border border-gray-200',
      status: 'Resolved',
      statusColor: 'bg-[#2a7a85] text-white',
      issue: 'Broken window glass',
      assigned: 'Maintenance Team B',
      room: 'C-312',
      reporter: 'System',
      date: '2026-03-18',
    }
  ];

  return (
    <div className="flex bg-white font-sans text-gray-800" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar role="Admin" />
      
      <main className="flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <Topbar />
        
        <div className="p-8 overflow-y-auto" style={{ flex: 1 }}>
          <h1 className="text-2xl font-bold text-[#1f2937] mb-6">Maintenance Reports</h1>
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <span className="text-[#6b7280] font-medium text-[15px]">Total</span>
              </div>
              <div className="text-3xl font-bold text-[#1f2937]">48</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-[#6b7280] font-medium text-[15px]">Pending</span>
              </div>
              <div className="text-3xl font-bold text-[#f59e0b]">12</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="text-[#6b7280] font-medium text-[15px]">In Progress</span>
              </div>
              <div className="text-3xl font-bold text-[#3b82f6]">8</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span className="text-[#6b7280] font-medium text-[15px]">Resolved</span>
              </div>
              <div className="text-3xl font-bold text-[#10b981]">28</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-[19px] font-bold text-[#1f2937] mb-6">All Requests</h2>
            
            <div className="flex flex-col gap-4">
              {maintenanceRequests.map((req, idx) => (
                <div key={idx} className="border border-gray-100 rounded-[12px] p-5 shadow-sm bg-white hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] font-bold text-[#1f2937]">{req.id}</span>
                      <span className={`text-[11px] font-bold px-[10px] py-[3px] rounded-full ${req.priorityColor}`}>
                        {req.priority}
                      </span>
                      <span className={`text-[11px] font-bold px-[10px] py-[3px] rounded-full ${req.statusColor}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Assigned: {req.assigned}
                    </div>
                  </div>
                  
                  <div className="text-[15px] text-[#374151] mb-1">
                    {req.issue}
                  </div>
                  <div className="text-[13px] text-gray-400">
                    Room {req.room} • Reported by {req.reporter} • {req.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
