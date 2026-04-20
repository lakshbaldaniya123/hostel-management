import { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { HostelContext }     from '../context/HostelContext';
import { LeaveContext }      from '../context/LeaveContext';
import { MaintenanceContext } from '../context/MaintenanceContext';
import { ComplaintContext }  from '../context/ComplaintContext';
import { useAuth }           from '../context/AuthContext';

const badgeColor = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-yellow-100 text-yellow-800',
  red:   'bg-red-100   text-red-800',
};

function WardenDashboard() {
  const { students }  = useContext(HostelContext);
  const { leaves }    = useContext(LeaveContext);
  const { requests }  = useContext(MaintenanceContext);
  const { complaints } = useContext(ComplaintContext);
  const { currentUser } = useAuth();

  // ── Filter everything to this warden's block ─────────────────────────────
  const myBlock = currentUser?.block; // e.g. 'A', 'B', 'C'
  const myStudents = currentUser?.role === 'Admin' ? students : (myBlock ? students.filter(s => s.roomNo?.toUpperCase().startsWith(myBlock.toUpperCase())) : []);
  const myLeaves = currentUser?.role === 'Admin' ? leaves : (myBlock ? leaves.filter(l => l.roomNo?.toUpperCase().startsWith(myBlock.toUpperCase())) : []);
  const myRequests = currentUser?.role === 'Admin' ? requests : (myBlock ? requests.filter(r => r.roomNo?.toUpperCase().startsWith(myBlock.toUpperCase())) : []);
  const myComplaints = currentUser?.role === 'Admin' ? complaints : (myBlock ? complaints.filter(c => c.roomNo?.toUpperCase().startsWith(myBlock.toUpperCase())) : []);

  // ── Live stats (scoped to this warden's block) ────────────────────────────
  const pendingLeaves   = myLeaves.filter(l => l.status === 'Pending').length;
  const openMaintenance = myRequests.filter(r => r.status === 'Pending' || r.status === 'Scheduled').length;
  const newComplaints   = myComplaints.filter(c => c.status === 'Pending').length;

  const stats = [
    { icon: '👥', value: myStudents.length,  label: `Block ${myBlock || 'All'} Students` },
    { icon: '📋', value: pendingLeaves,       label: 'Pending Leaves'   },
    { icon: '🔧', value: openMaintenance,     label: 'Open Maintenance' },
    { icon: '📢', value: newComplaints,        label: 'New Complaints'   },
  ];

  // ── Show latest 4 leave requests (block-filtered) ─────────────────────────
  const recentLeaves = myLeaves.slice(0, 4);

  // ── Show latest 4 complaints (block-filtered) ─────────────────────────────
  const recentComplaints = myComplaints.slice(0, 4);

  const statusColor = (status) => {
    if (status === 'Approved' || status === 'Resolved') return 'green';
    if (status === 'Rejected')                          return 'red';
    return 'amber';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="Warden" />

      <main className="flex-1 p-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {currentUser?.name || 'Warden'} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-400 flex items-center justify-center text-xl">
            👤
          </div>
        </div>

        {/* Stat cards — live data */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-2 gap-5">

          {/* Leave requests table — live */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Leave Requests</h2>
            {recentLeaves.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">No leave requests yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-2 font-medium">Student</th>
                    <th className="pb-2 font-medium">Room</th>
                    <th className="pb-2 font-medium">From</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeaves.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-gray-800">{r.studentName}</td>
                      <td className="py-2 text-gray-500">{r.roomNo}</td>
                      <td className="py-2 text-gray-500">{r.fromDate}</td>
                      <td className="py-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[statusColor(r.status)]}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Complaints panel — live */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Complaints</h2>
            {recentComplaints.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">No complaints yet.</p>
            ) : (
              <div className="space-y-3">
                {recentComplaints.map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                    <span className="text-gray-700 truncate mr-4">{c.description}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${badgeColor[statusColor(c.status)]}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Housekeeping Aggregated Feedback */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Recent Housekeeping Feedback</h2>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-bold border border-green-100">
              Avg Rating: 4.2 / 5.0
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { rm: '302', stars: 5, note: 'Very clean, punctual staff.' },
              { rm: '110', stars: 2, note: 'Missed garbage bin.' },
              { rm: '205', stars: 4, note: 'Good but late arrival.' },
            ].map((fb, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-gray-800">Room {fb.rm}</span>
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className={j < fb.stars ? 'opacity-100' : 'opacity-30'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{fb.note}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default WardenDashboard;