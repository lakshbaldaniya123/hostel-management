import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import WardenDashboard from './pages/WardenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MaintenancePage from './pages/MaintenancePage';
import ComplaintsPage from './pages/ComplaintsPage';
import MyRoomPage from './pages/MyRoomPage';
import Fees from "./pages/Fees";
import HousekeeperDashboard from "./pages/HousekeeperDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
import StudentLeavePage from "./pages/StudentLeavePage";
import WardenLeavePage from "./pages/WardenLeavePage";
import WardenStudentsPage from "./pages/WardenStudentsPage";
import WardenRoomsPage from "./pages/WardenRoomsPage";
import StudentMaintenancePage from "./pages/StudentMaintenancePage";
import WardenMaintenancePage from "./pages/WardenMaintenancePage";
import UserComplaintPage from "./pages/UserComplaintPage";
import WardenComplaintPage from "./pages/WardenComplaintPage";
import SecurityNuisancePage from "./pages/SecurityNuisancePage";
import UserMeetingsPage from "./pages/UserMeetingsPage";
import WardenMeetingsPage from "./pages/WardenMeetingsPage";
import { LeaveProvider } from "./context/LeaveContext";
import { HostelProvider } from "./context/HostelContext";
import { MaintenanceProvider } from "./context/MaintenanceContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { MeetingProvider } from "./context/MeetingContext";

function App() {
  return (
    <MeetingProvider>
    <ComplaintProvider>
      <MaintenanceProvider>
        <HostelProvider>
          <LeaveProvider>
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/warden-dashboard" element={<WardenDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/housekeeper-dashboard" element={<HousekeeperDashboard />} />
          <Route path="/security-dashboard" element={<SecurityDashboard />} />
          <Route path="/student-maintenance" element={<StudentMaintenancePage />} />
          <Route path="/warden-maintenance" element={<WardenMaintenancePage />} />
          <Route path="/user-complaints" element={<UserComplaintPage />} />
          <Route path="/warden-complaints" element={<WardenComplaintPage />} />
          <Route path="/nuisance-report" element={<SecurityNuisancePage />} />
          
          {/* Strictly isolated meeting boards */}
          <Route path="/student-meetings" element={<UserMeetingsPage fixedRole="Student" />} />
          <Route path="/housekeeper-meetings" element={<UserMeetingsPage fixedRole="Housekeeper" />} />
          <Route path="/security-meetings" element={<UserMeetingsPage fixedRole="Security" />} />
          
          <Route path="/warden-meetings" element={<WardenMeetingsPage />} />
          <Route path="/my-room" element={<MyRoomPage />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/leave" element={<StudentLeavePage />} />
          <Route path="/leave-requests" element={<WardenLeavePage />} />
          <Route path="/students" element={<WardenStudentsPage />} />
          <Route path="/rooms" element={<WardenRoomsPage />} />
          </Routes>
        </BrowserRouter>
        </LeaveProvider>
      </HostelProvider>
    </MaintenanceProvider>
    </ComplaintProvider>
    </MeetingProvider>
  );
}

export default App;