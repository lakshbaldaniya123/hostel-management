import Sidebar from '../components/Sidebar';

// Temporary fake data (will come from API later)
const student = {
  name: 'Shyam',
  room: '204',
  block: 'A',
  feeDue: '₹12,000',
  feeStatus: 'Pending',
  leaveStatus: 'Approved',
  leaveDates: '20–22 Mar',
};

const recentActivity = [
  { text: 'Gate pass generated', status: 'Done',    color: 'green' },
  { text: 'Maintenance raised',  status: 'Open',    color: 'amber' },
  { text: 'Leave approved',      status: 'Done',    color: 'green' },
  { text: 'Fee reminder',        status: 'Due',     color: 'red'   },
];

const messMenu = [
  { meal: 'Breakfast', items: 'Poha + Chai' },
  { meal: 'Lunch',     items: 'Dal + Rice + Sabzi' },
  { meal: 'Snacks',    items: 'Samosa + Tea' },
  { meal: 'Dinner',    items: 'Roti + Paneer' },
];

const badgeColor = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-yellow-100 text-yellow-800',
  red:   'bg-red-100 text-red-800',
};

function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="Student" />

      <main className="flex-1 p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Good morning, {student.name} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Room {student.room} · Block {student.block}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-xl">
            👤
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-2xl mb-2">🛏</div>
            <div className="text-lg font-semibold text-gray-800">Room {student.room}</div>
            <div className="text-xs text-gray-500 mt-1">Block {student.block} · 3-sharing</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-2xl mb-2">💳</div>
            <div className="text-lg font-semibold text-gray-800">{student.feeDue}</div>
            <div className="text-xs text-gray-500 mt-1">
              Fee due ·{' '}
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                {student.feeStatus}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-lg font-semibold text-gray-800">Leave</div>
            <div className="text-xs text-gray-500 mt-1">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {student.leaveStatus}
              </span>{' '}
              · {student.leaveDates}
            </div>
          </div>
        </div>

        {/* Two panels side by side */}
        <div className="grid grid-cols-2 gap-5">
          {/* Recent activity */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                  <span className="text-gray-700">{item.text}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[item.color]}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mess menu */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Today's Mess Menu</h2>
            <div className="space-y-3">
              {messMenu.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                  <span className="font-medium text-gray-700">{item.meal}</span>
                  <span className="text-gray-500 text-xs">{item.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;