import { NavLink, useNavigate } from 'react-router-dom';

// Each role gets its own menu items
const menuItems = {
  Student: [
    { label: 'Dashboard',     icon: '🏠', path: '/student-dashboard' },
    { label: 'My Room',       icon: '🛏', path: '/my-room' },
    { label: 'Fee Status',    icon: '💳', path: '/fees' },
    { label: 'Apply Leave',   icon: '📋', path: '/leave' },
    { label: 'Gate Pass',     icon: '🎫', path: '/gate-pass' },
    { label: 'Mess Menu',     icon: '🍽', path: '/mess' },
    { label: 'Maintenance',   icon: '🔧', path: '/maintenance' },
    { label: 'Complaints',    icon: '📢', path: '/complaints' },
    { label: 'Lost & Found',  icon: '🔍', path: '/lost-found' },
  ],
  Warden: [
    { label: 'Dashboard',     icon: '🏠', path: '/warden-dashboard' },
    { label: 'Students',      icon: '👥', path: '/students' },
    { label: 'Leave Requests',icon: '📋', path: '/leave-requests' },
    { label: 'Maintenance',   icon: '🔧', path: '/maintenance' },
    { label: 'Complaints',    icon: '📢', path: '/complaints' },
    { label: 'Meetings',      icon: '📅', path: '/meetings' },
  ],
  Admin: [
    { label: 'Dashboard',     icon: '🏠', path: '/admin-dashboard' },
    { label: 'Students',      icon: '👥', path: '/students' },
    { label: 'Rooms',         icon: '🛏', path: '/rooms' },
    { label: 'Fee Management',icon: '💳', path: '/fees' },
    { label: 'Staff',         icon: '👔', path: '/staff' },
    { label: 'Reports',       icon: '📊', path: '/reports' },
  ],
};

function Sidebar({ role }) {
  const navigate = useNavigate();
  const items = menuItems[role] || menuItems['Student'];

  return (
    <div className="w-60 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="text-lg font-semibold">🏠 HMS</div>
        <div className="text-xs text-gray-400 mt-0.5">{role} Portal</div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;