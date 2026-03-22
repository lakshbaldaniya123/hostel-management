import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login              from './pages/Login';
import StudentDashboard   from './pages/StudentDashboard';
import WardenDashboard    from './pages/WardenDashboard';
import AdminDashboard     from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<Login />} />
        <Route path="/student-dashboard"  element={<StudentDashboard />} />
        <Route path="/warden-dashboard"   element={<WardenDashboard />} />
        <Route path="/admin-dashboard"    element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;