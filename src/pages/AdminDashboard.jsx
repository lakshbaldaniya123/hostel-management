import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AdminDashboard() {

  const quickStats = [
    { label: 'Total Students', value: '1,248', trend: '+12 this month', icon: '👨‍🎓', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Available Rooms', value: '42', trend: '85% Occupancy', icon: '🏨', color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Pending Dues', value: '₹4.2L', trend: '12 Overdue', icon: '💳', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Active Complaints', value: '15', trend: '5 High Priority', icon: '⚠️', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const recentActivities = [
    { id: 1, title: 'New Admission', desc: 'Rahul Sharma admitted to Room A-101', time: '10 mins ago', type: 'success' },
    { id: 2, title: 'Maintenance Alert', desc: 'Plumbing issue reported in Block B', time: '1 hr ago', type: 'warning' },
    { id: 3, title: 'Fee Payment', desc: '₹45,000 received via Gateway', time: '2 hrs ago', type: 'info' },
    { id: 4, title: 'Leave Request', desc: 'Priya Patel requested leave for 3 days', time: '5 hrs ago', type: 'default' },
  ];

  const quickActions = [
    { name: 'Admit Student', icon: '📝' },
    { name: 'Allocate Room', icon: '🔑' },
    { name: 'Collect Fee', icon: '💰' },
    { name: 'Broadcast MSG', icon: '📢' },
  ];

  return (
    <div className="flex bg-gray-50 font-sans text-gray-800" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar role="Admin" />
      
      <main className="flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <Topbar />
        
        <div className="p-8 overflow-y-auto" style={{ flex: 1 }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1f2937]">Admin Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor hostel operations, track finances, and manage students.</p>
          </div>
          
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${stat.bg}`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">{stat.label}</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{stat.trend}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Occupancy / Revenue Chart Placeholder */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[17px] font-bold text-[#1f2937]">Revenue & Occupancy Trend</h2>
                  <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none">
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📈</div>
                    <p className="text-sm text-gray-400 font-medium">Interactive Chart Analytics Container</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-[17px] font-bold text-[#1f2937] mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {quickActions.map((action, idx) => (
                    <button key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal-50 hover:border-teal-100 transition-colors flex flex-col items-center justify-center gap-3 group">
                      <div className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-700">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar / Right Column */}
            <div className="flex flex-col gap-8">
              
              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[17px] font-bold text-[#1f2937]">Recent Activity</h2>
                  <button className="text-sm text-teal-600 hover:text-teal-700 font-semibold">View All</button>
                </div>
                
                <div className="space-y-6">
                  {recentActivities.map((act) => (
                    <div key={act.id} className="flex gap-4">
                      <div className="mt-1">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          act.type === 'success' ? 'bg-green-500' : 
                          act.type === 'warning' ? 'bg-orange-500' :
                          act.type === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{act.title}</h4>
                        <p className="text-[13px] text-gray-500 mt-0.5">{act.desc}</p>
                        <span className="text-[11px] font-semibold text-gray-400 mt-1 block">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health / Status */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-gradient-to-br from-[#1f2937] to-[#111827] text-white">
                <h2 className="text-[17px] font-bold mb-4">System Status</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Database</span>
                    <span className="text-xs font-bold px-2 py-1 bg-green-500/20 text-green-400 rounded-md">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Payment Gateway</span>
                    <span className="text-xs font-bold px-2 py-1 bg-green-500/20 text-green-400 rounded-md">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Biometric Sync</span>
                    <span className="text-xs font-bold px-2 py-1 bg-orange-500/20 text-orange-400 rounded-md">Syncing...</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}