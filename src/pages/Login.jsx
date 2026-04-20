import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roles = [
  { id: 'Student', icon: '🎓' },
  { id: 'Warden',  icon: '🧑‍💼' },
  { id: 'Admin',   icon: '🛡️' },
  { id: 'Staff',   icon: '👔' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('Student');
  const [staffRole,    setStaffRole]    = useState('Housekeeper');
  const [hostelId,     setHostelId]     = useState('');
  const [password,     setPassword]     = useState('');
  const [showPass,     setShowPass]     = useState(false);
  const [remember,     setRemember]     = useState(false);
  const [errorMsg,     setErrorMsg]     = useState('');
  const [loading,      setLoading]      = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg('');

    // ── Frontend guard — both fields required ──────────────────────────────
    if (!hostelId.trim() || !password.trim()) {
      setErrorMsg('Please enter both Hostel ID and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostelId: hostelId.trim(), password, role: selectedRole, staffRole })
      });
      const data = await res.json();

      if (!res.ok) {
        // Backend returned 400/401/403 — show the error, DO NOT navigate
        setErrorMsg(data.message || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      // ── Success ────────────────────────────────────────────────────────────
      login(data.user);
      console.log('✅ Logged in as:', data.user.name, '|', data.user.role);

      if (selectedRole === 'Student') navigate('/student-dashboard');
      if (selectedRole === 'Warden')  navigate('/warden-dashboard');
      if (selectedRole === 'Admin')   navigate('/admin-dashboard');
      if (selectedRole === 'Staff') {
        if (staffRole === 'Housekeeper') navigate('/housekeeper-dashboard');
        if (staffRole === 'Security')    navigate('/security-dashboard');
      }

    } catch (err) {
      // Backend offline fallback — still requires valid-looking inputs
      console.warn('Backend offline — routing locally:', err.message);
      setErrorMsg('Cannot reach server. Please make sure the backend is running.');
    }
    setLoading(false);
  }

  return (
    <div style={styles.page}>

      {/* ── LEFT PANEL ── */}
      <div style={styles.left}>
        {/* Teal overlay */}
        <div style={styles.overlay} />

        {/* Content on top of overlay */}
        <div style={styles.leftContent}>
          {/* Building icon */}
          <div style={styles.buildingIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="6"  y="10" width="36" height="30" rx="2" stroke="white" strokeWidth="2" fill="none"/>
              <rect x="12" y="16" width="6"  height="6"  rx="1" fill="white" opacity="0.8"/>
              <rect x="22" y="16" width="6"  height="6"  rx="1" fill="white" opacity="0.8"/>
              <rect x="30" y="16" width="6"  height="6"  rx="1" fill="white" opacity="0.8"/>
              <rect x="12" y="26" width="6"  height="6"  rx="1" fill="white" opacity="0.8"/>
              <rect x="22" y="26" width="6"  height="6"  rx="1" fill="white" opacity="0.8"/>
              <rect x="30" y="26" width="6"  height="6"  rx="1" fill="white" opacity="0.8"/>
              <rect x="18" y="32" width="12" height="8"  rx="1" fill="white" opacity="0.9"/>
              <line x1="6" y1="10" x2="24" y2="2"  stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="42" y1="10" x2="24" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 style={styles.leftTitle}>Hostel Management<br />System</h1>
          <p style={styles.leftSubtitle}>
            Streamlined hostel administration — manage students,<br />
            rooms, fees, and more from one place.
          </p>

          {/* Feature badges */}
          <div style={styles.badges}>
            <span style={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Secure Access
            </span>
            <span style={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              Real-time Data
            </span>
            <span style={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
              Mobile Ready
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={styles.right}>
        <div style={styles.formCard}>

          <h2 style={styles.formTitle}>Welcome back</h2>
          <p style={styles.formSubtitle}>Sign in to your hostel account</p>

          {/* Role selector */}
          <div style={styles.roleRow}>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                style={{
                  ...styles.roleBtn,
                  ...(selectedRole === r.id ? styles.roleBtnActive : {}),
                }}
              >
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                {r.id}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Error Banner */}
            {errorMsg && (
              <div style={styles.errorBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errorMsg}
              </div>
            )}
            
            {/* Show staff sub-role selector if Staff is selected */}
            {selectedRole === 'Staff' && (
              <div style={{ marginBottom: 20 }}>
                <label style={styles.label}>Select Department</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setStaffRole('Housekeeper')}
                    style={{
                      ...styles.staffSubBtn,
                      ...(staffRole === 'Housekeeper' ? styles.staffSubBtnActive : {})
                    }}
                  >
                    🧹 Housekeeper
                  </button>
                  <button
                    type="button"
                    onClick={() => setStaffRole('Security')}
                    style={{
                      ...styles.staffSubBtn,
                      ...(staffRole === 'Security' ? styles.staffSubBtnActive : {})
                    }}
                  >
                    👮 Security Guard
                  </button>
                </div>
              </div>
            )}

            {/* Hostel ID */}
            <label style={styles.label}>{selectedRole === 'Staff' ? 'Staff ID' : 'Hostel ID'}</label>
            <input
              type="text"
              value={hostelId}
              onChange={e => setHostelId(e.target.value)}
              placeholder={selectedRole === 'Staff' ? "Enter your Staff ID" : "Enter your Hostel ID"}
              style={styles.input}
              onFocus={e => e.target.style.borderColor = '#0d9488'}
              onBlur={e  => e.target.style.borderColor = '#e5e7eb'}
            />

            {/* Password */}
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ ...styles.input, marginBottom: 0, paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = '#0d9488'}
                onBlur={e  => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={styles.eyeBtn}
              >
                {showPass ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>

            {/* Remember me + Forgot password */}
            <div style={styles.rememberRow}>
              <label style={styles.rememberLabel}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ marginRight: 6, accentColor: '#0d9488' }}
                />
                Remember me
              </label>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.signInBtn,
                ...(loading ? { background: '#5eead4', cursor: 'not-allowed' } : {})
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = '#0f766e'; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = '#0d9488'; }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          © 2026 Hostel Management System • All rights reserved
        </p>
      </div>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    backgroundColor: '#fef2f2',
    border: '1.5px solid #fecaca',
    borderRadius: 10,
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 16,
  },

  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f9fafb',
  },

  /* Left panel */
  left: {
    flex: 1,
    position: 'relative',
    backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(13,148,136,0.82) 0%, rgba(15,118,110,0.88) 100%)',
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
    padding: '48px',
    color: 'white',
    width: '100%',
  },
  buildingIcon: {
    marginBottom: 24,
    opacity: 0.95,
  },
  leftTitle: {
    fontSize: 38,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 16,
    color: 'white',
  },
  leftSubtitle: {
    fontSize: 15,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 36,
    maxWidth: 420,
  },
  badges: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 500,
  },

  /* Right panel */
  right: {
    width: 520,
    minWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
    backgroundColor: '#f9fafb',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: '40px 36px',
    width: '100%',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 28,
  },

  /* Role buttons */
  roleRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 28,
  },
  roleBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    padding: '10px 8px',
    borderRadius: 10,
    border: '1.5px solid #e5e7eb',
    background: 'white',
    fontSize: 13,
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  roleBtnActive: {
    background: '#0d9488',
    borderColor: '#0d9488',
    color: 'white',
  },

  /* Form fields */
  label: {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1.5px solid #e5e7eb',
    fontSize: 14,
    color: '#111827',
    marginBottom: 20,
    outline: 'none',
    transition: 'border-color 0.15s',
    backgroundColor: '#f9fafb',
  },
  passwordWrap: {
    position: 'relative',
    marginBottom: 16,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },

  /* Remember + forgot */
  rememberRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    color: '#6b7280',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: 13,
    color: '#0d9488',
    textDecoration: 'none',
    fontWeight: 500,
  },

  /* Sign in button */
  signInBtn: {
    width: '100%',
    padding: '13px',
    background: '#0d9488',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s',
    letterSpacing: 0.3,
  },

  footer: {
    marginTop: 24,
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  staffSubBtn: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1.5px solid #e5e7eb',
    background: 'white',
    fontSize: 13,
    fontWeight: 500,
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  staffSubBtnActive: {
    borderColor: '#0d9488',
    background: '#f0fdfa',
    color: '#0f766e',
  }
};