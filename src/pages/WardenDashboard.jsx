import Sidebar from '../components/Sidebar';

const stats = [
  { icon: '👥', value: '124', label: 'Total students' },
  { icon: '📋', value: '6',   label: 'Pending leaves'  },
  { icon: '🔧', value: '3',   label: 'Open maintenance' },
  { icon: '📢', value: '2',   label: 'New complaints'   },
];

const leaveRequests = [
  { name: 'Roshan M.',  room: '201', dates: '20–22 Mar', status: 'Pending',  color: 'amber' },
  { name: 'Lakshya B.', room: '305', dates: '21–23 Mar', status: 'Pending',  color: 'amber' },
  { name: 'Ankit S.',   room: '108', dates: '22 Mar',    status: 'Approved', color: 'green' },
  { name: 'Priya R.',   room: '214', dates: '19–20 Mar', status: 'Rejected', color: 'red'   },
];

const complaints = [
  { text: 'Water leakage – Room 204',   status: 'Open',     color: 'amber' },
  { text: 'WiFi not working – Block A', status: 'Open',     color: 'amber' },
  { text: 'Broken chair – Room 301',    status: 'Resolved', color: 'green' },
  { text: 'Noisy neighbours – 108',     status: 'Resolved', color: 'green' },
];

const badgeColor = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-yellow-100 text-yellow-800',
  red:   'bg-red-100   text-red-800',
};

function WardenDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="Warden" />

      <main className="flex-1 p-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, Warden Patel 👋</h1>
            <p className="text-sm text-gray-500 mt-1">Block A · 17 March 2026</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-400 flex items-center justify-center text-xl">
            👤
          </div>
        </div>

        {/* Stat cards */}
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

          {/* Leave requests table */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Pending Leave Requests</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Student</th>
                  <th className="pb-2 font-medium">Room</th>
                  <th className="pb-2 font-medium">Dates</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 text-gray-800">{r.name}</td>
                    <td className="py-2 text-gray-500">{r.room}</td>
                    <td className="py-2 text-gray-500">{r.dates}</td>
                    <td className="py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[r.color]}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Complaints panel */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Complaints</h2>
            <div className="space-y-3">
              {complaints.map((c, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                  <span className="text-gray-700">{c.text}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[c.color]}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default WardenDashboard;