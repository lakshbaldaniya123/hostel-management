import { NavLink, useNavigate } from 'react-router-dom';

// ── Icons (wrapped in functions to avoid JSX-as-object bug) ──
const Icons = {
  Dashboard:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  Students:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Rooms:       () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Fees:        () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Leave:       () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>,
  Maintenance: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  GatePass:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Mess:        () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  Gym:         () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><path d="M3 10.5v3"/><path d="M21 10.5v3"/><path d="M6.5 6.5v11"/><path d="M17.5 6.5v11"/><path d="M3 12h18"/></svg>,
  LostFound:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Complaints:  () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Reports:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Staff:       () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Meetings:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Logout:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// ── Menu items per role ──
const menuItems = {
  Student: [
    { label: 'Dashboard',    icon: Icons.Dashboard,   path: '/student-dashboard' },
    { label: 'My Room',      icon: Icons.Rooms,        path: '/my-room'           },
    { label: 'Fees',         icon: Icons.Fees,         path: '/fees'              },
    { label: 'Leave',        icon: Icons.Leave,        path: '/leave'             },
    { label: 'Maintenance',  icon: Icons.Maintenance,  path: '/student-maintenance'},
    { label: 'Gate Pass',    icon: Icons.GatePass,     path: '/gate-pass'         },
    { label: 'Mess',         icon: Icons.Mess,         path: '/mess'              },
    { label: 'Gym',          icon: Icons.Gym,          path: '/gym'               },
    { label: 'Lost & Found', icon: Icons.LostFound,    path: '/lost-found'        },
    { label: 'Complaints',   icon: Icons.Complaints,   path: '/user-complaints'   },
    { label: 'Meetings',     icon: Icons.Meetings,     path: '/student-meetings'  },
  ],
  Warden: [
    { label: 'Dashboard',   icon: Icons.Dashboard,   path: '/warden-dashboard' },
    { label: 'Students',    icon: Icons.Students,    path: '/students'         },
    { label: 'Rooms',       icon: Icons.Rooms,       path: '/rooms'            },
    { label: 'Leave',       icon: Icons.Leave,       path: '/leave-requests'   },
    { label: 'Maintenance', icon: Icons.Maintenance, path: '/warden-maintenance'},
    { label: 'Gate Pass',   icon: Icons.GatePass,    path: '/warden-gate-pass' },
    { label: 'Mess System', icon: Icons.Mess,        path: '/warden-mess'      },
    { label: 'Gym Booking', icon: Icons.Gym,         path: '/warden-gym'       },
    { label: 'Lost & Found',icon: Icons.LostFound,   path: '/warden-lost-found'},
    { label: 'Complaints',  icon: Icons.Complaints,  path: '/warden-complaints'},
    { label: 'Meetings',    icon: Icons.Meetings,    path: '/warden-meetings'  },
  ],
  Admin: [
    { label: 'Dashboard',   icon: Icons.Dashboard,   path: '/admin-dashboard' },
    { label: 'Students',    icon: Icons.Students,    path: '/students'        },
    { label: 'Rooms',       icon: Icons.Rooms,       path: '/rooms'           },
    { label: 'Fees',        icon: Icons.Fees,        path: '/fees'            },
    { label: 'Staff',       icon: Icons.Staff,       path: '/staff'           },
    { label: 'Reports',     icon: Icons.Reports,     path: '/reports'         },
    { label: 'Gate Pass',   icon: Icons.GatePass,    path: '/warden-gate-pass'},
    { label: 'Mess System', icon: Icons.Mess,        path: '/warden-mess'     },
    { label: 'Gym Booking', icon: Icons.Gym,         path: '/warden-gym'      },
    { label: 'Lost & Found',icon: Icons.LostFound,   path: '/warden-lost-found'},
    { label: 'Complaints',  icon: Icons.Complaints,  path: '/warden-complaints'},
    { label: 'Meetings',    icon: Icons.Meetings,    path: '/meetings'        },
    { label: 'Settings',    icon: Icons.Settings,    path: '/settings'        },
  ],
  Housekeeper: [
    { label: 'Dashboard',   icon: Icons.Dashboard,   path: '/housekeeper-dashboard' },
    { label: 'Cleaning',    icon: Icons.Maintenance, path: '/cleaning-schedule'     },
    { label: 'Complaints',  icon: Icons.Complaints,  path: '/user-complaints'       },
    { label: 'Meetings',    icon: Icons.Meetings,    path: '/housekeeper-meetings'  },
  ],
  Security: [
    { label: 'Dashboard',    icon: Icons.Dashboard,   path: '/security-dashboard' },
    { label: 'Gate Pass Check',icon: Icons.GatePass,  path: '/security-gate-pass' },
    { label: 'Exit Logs',    icon: Icons.Leave,       path: '/exit-logs'          },
    { label: 'Nuisance',     icon: Icons.Complaints,  path: '/nuisance-report'    },
    { label: 'Lost & Found', icon: Icons.LostFound,   path: '/lost-found'         },
    { label: 'Meetings',     icon: Icons.Meetings,    path: '/security-meetings'  },
  ],
};

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const items = menuItems[role] || menuItems['Student'];

  return (
    <div style={styles.sidebar}>

      {/* Logo */}
      <div style={styles.logoRow}>
        <div style={styles.logoIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <span style={styles.logoText}>HMS</span>
      </div>

      {/* Menu label */}
      <div style={styles.menuLabel}>MENU</div>

      {/* Nav items */}
      <nav style={styles.nav}>
        {items.map(item => {
          const Icon = item.icon; // treat it as a component
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
            >
              {({ isActive }) => (
                <>
                  <span style={{ ...styles.navIcon, color: isActive ? '#0d9488' : '#8892a4' }}>
                    <Icon />
                  </span>
                  <span style={{ color: isActive ? '#0d9488' : '#a0aec0', fontWeight: isActive ? 600 : 400, fontSize: 14 }}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={styles.logoutWrap}>
        <button
          onClick={() => navigate('/')}
          style={styles.logoutBtn}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8892a4'; }}
        >
          <span style={{ color: 'inherit', display: 'flex' }}><Icons.Logout /></span>
          <span style={{ fontSize: 14 }}>Logout</span>
        </button>
      </div>

    </div>
  );
}

// ── Styles ──
const styles = {
  sidebar: {
    width: 240,
    minHeight: '100vh',
    backgroundColor: '#1a2035',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    fontFamily: "'Segoe UI', sans-serif",
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '24px 20px 20px',
    marginBottom: 8,
  },
  logoIcon: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(13,148,136,0.15)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    color: '#e2e8f0',
    letterSpacing: 1,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#4a5568',
    letterSpacing: '0.1em',
    padding: '0 20px 10px',
  },
  nav: {
    flex: 1,
    padding: '0 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflowY: 'auto',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 8,
    textDecoration: 'none',
    transition: 'background 0.15s',
    backgroundColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: 'rgba(13,148,136,0.12)',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  logoutWrap: {
    padding: '16px 12px 24px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginTop: 8,
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    color: '#8892a4',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: "'Segoe UI', sans-serif",
  },
};