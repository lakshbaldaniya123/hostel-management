// src/pages/AdminDashboard.jsx
import Sidebar from '../components/Sidebar';
function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="Admin" />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Coming soon...</p>
      </main>
    </div>
  );
}
export default AdminDashboard;