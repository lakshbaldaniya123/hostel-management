import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { FeesContext } from '../context/FeesContext';
import { LeaveContext } from '../context/LeaveContext';
import { MessContext } from '../context/MessContext';
import { MaintenanceContext } from '../context/MaintenanceContext';

const badgeColor = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-yellow-100 text-yellow-800',
  red:   'bg-red-100 text-red-800',
  blue:  'bg-blue-100 text-blue-800',
};

function StudentDashboard() {
  const { currentUser } = useAuth();
  const { feeRecords } = useContext(FeesContext);
  const { leaves } = useContext(LeaveContext);
  const { requests } = useContext(MaintenanceContext);
  const { weeklyMenu } = useContext(MessContext);

  const studentName = currentUser?.name || 'Student';
  const studentId = currentUser?.hostelId || currentUser?.studentId || 'STU-GUEST';
  const roomNo = currentUser?.roomNo || 'Unassigned';
  const block = currentUser?.block || 'A';

  // Fee logic
  const myFee = feeRecords.find(f => f.studentId === studentId || f.studentName === studentName);
  const feeDue = myFee?.pendingFees || 0;
  const feeStatus = myFee?.status || 'Clear';

  // Leave logic
  const myLeaves = leaves.filter(l => l.studentId === studentId || l.name === studentName);
  const activeLeave = myLeaves.find(l => l.status === 'Approved' || l.status === 'Pending') || myLeaves[0];
  const leaveStatus = activeLeave?.status || 'In Hostel';
  const leaveDates = activeLeave ? `${new Date(activeLeave.fromDate).toLocaleDateString('en-GB', {day: 'numeric', month:'short'})} - ${new Date(activeLeave.toDate).toLocaleDateString('en-GB', {day: 'numeric', month:'short'})}` : '--';

  // Recent Activity logic (combinatorial)
  const myMaintenance = requests.filter(r => r.studentId === studentId);
  const activities = [];
  
  if (myFee && myFee.status === 'Overdue') {
    activities.push({ text: 'Fee Overdue Reminder', status: 'Due', color: 'red' });
  }
  if (activeLeave) {
    activities.push({ text: `Leave Request (${activeLeave.status})`, status: activeLeave.status, color: activeLeave.status === 'Approved' ? 'green' : 'amber' });
  }
  if (myMaintenance.length > 0) {
    const latestReq = myMaintenance[0];
    activities.push({ text: `${latestReq.issueType} Maintenance`, status: latestReq.status, color: latestReq.status === 'Completed' ? 'green' : 'blue' });
  }
  if (activities.length === 0) {
    activities.push({ text: 'No recent activity', status: 'Clear', color: 'green' });
  }

  // Mess
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysMenu = weeklyMenu[today] || { breakfast: 'Poha', lunch: 'Dal Rice', snacks: 'Tea', dinner: 'Roti Sabzi' };
  const messMenuArr = [
    { meal: 'Breakfast', items: todaysMenu.breakfast },
    { meal: 'Lunch',     items: todaysMenu.lunch },
    { meal: 'Snacks',    items: todaysMenu.snacks },
    { meal: 'Dinner',    items: todaysMenu.dinner },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          {/* Top bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                Welcome back, {studentName} 👋
              </h1>
              <p className="text-blue-100 text-sm font-medium">
                Room {roomNo} · Block {block} · ID: {studentId}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl shadow-sm">
              👨‍🎓
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl border border-indigo-100 shrink-0">🛏</div>
              <div>
                <div className="text-xl font-bold text-gray-900">Room {roomNo}</div>
                <div className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-widest">Block {block}</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-2xl border border-orange-100 shrink-0">💳</div>
              <div>
                <div className="text-xl font-bold text-gray-900">₹{feeDue.toLocaleString()}</div>
                <div className="text-xs font-semibold mt-1 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-gray-400">Dues</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                    feeStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {feeStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl border border-emerald-100 shrink-0">📋</div>
              <div>
                <div className="text-lg font-bold text-gray-900 leading-tight">{leaveDates}</div>
                <div className="text-xs font-semibold mt-1 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-gray-400">Leave</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                    leaveStatus === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {leaveStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two panels side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent activity */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                Status Overview
              </h2>
              <div className="space-y-4">
                {activities.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-700 text-sm">{item.text}</span>
                    <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md font-black ${badgeColor[item.color] || badgeColor.blue}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mess menu */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                  Today's Mess Menu
                </h2>
                <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">{today}</span>
              </div>
              <div className="space-y-4">
                {messMenuArr.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors gap-2">
                    <span className="font-bold text-gray-900 text-sm">{item.meal}</span>
                    <span className="text-gray-500 text-sm font-medium">{item.items || <span className="italic">Not scheduled</span>}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;