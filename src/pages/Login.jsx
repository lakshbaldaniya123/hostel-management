import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = ['Student', 'Warden', 'Admin', 'Security'];

function Login() {
  const [selectedRole, setSelectedRole] = useState('Student');
  const [hostelId, setHostelId]         = useState('');
  const [password, setPassword]         = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // Temporary: navigate based on role (no real API yet)
    if (selectedRole === 'Student') navigate('/student-dashboard');
    if (selectedRole === 'Warden')  navigate('/warden-dashboard');
    if (selectedRole === 'Admin')   navigate('/admin-dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-2xl">
            🏠
          </div>
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-800 mb-1">
          Hostel Management System
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">Sign in to your account</p>

        {/* Role selector */}
        <div className="flex gap-2 mb-6">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                selectedRole === role
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium'
                  : 'border-gray-200 text-gray-500 hover:border-gray-400'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-gray-600 mb-1">Hostel ID</label>
          <input
            type="text"
            value={hostelId}
            onChange={e => setHostelId(e.target.value)}
            placeholder="e.g. HMS2024001"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />

          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-6 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;