import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login              from './pages/Login';
import StudentDashboard   from './pages/StudentDashboard';
import WardenDashboard    from './pages/WardenDashboard';
import AdminDashboard     from './pages/AdminDashboard';
import MaintenancePage    from './pages/MaintenancePage';
import ComplaintsPage     from './pages/ComplaintsPage';
import MyRoomPage         from './pages/MyRoomPage';
import Fees               from "./pages/Fees";
import HousekeeperDashboard from "./pages/HousekeeperDashboard";
import SecurityDashboard  from "./pages/SecurityDashboard";
import StudentLeavePage   from "./pages/StudentLeavePage";
import WardenLeavePage    from "./pages/WardenLeavePage";
import { LeaveProvider }  from "./context/LeaveContext";

function App() {
  return (
    <LeaveProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                      element={<Login />} />
          <Route path="/student-dashboard"     element={<StudentDashboard />} />
          <Route path="/warden-dashboard"      element={<WardenDashboard />} />
          <Route path="/admin-dashboard"       element={<AdminDashboard />} />
          <Route path="/housekeeper-dashboard" element={<HousekeeperDashboard />} />
          <Route path="/security-dashboard"    element={<SecurityDashboard />} />
          <Route path="/maintenance"           element={<MaintenancePage />} />
          <Route path="/complaints"            element={<ComplaintsPage />} />
          <Route path="/my-room"               element={<MyRoomPage />} />
          <Route path="/fees"                  element={<Fees />} />
          <Route path="/leave"                 element={<StudentLeavePage />} />
          <Route path="/leave-requests"        element={<WardenLeavePage />} />
        </Routes>
      </BrowserRouter>
    </LeaveProvider>
  );
}

export default App;