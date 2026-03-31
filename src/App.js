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
import AdminRoomsPage from "./pages/AdminRoomsPage";
import AdminMaintenancePage from "./pages/AdminMaintenancePage";
import AdminFeesPage from "./pages/AdminFeesPage";
import UserComplaintPage from "./pages/UserComplaintPage";
import WardenComplaintPage from "./pages/WardenComplaintPage";
import SecurityNuisancePage from "./pages/SecurityNuisancePage";
import UserMeetingsPage from "./pages/UserMeetingsPage";
import WardenMeetingsPage from "./pages/WardenMeetingsPage";

import StudentGatePassPage from "./pages/StudentGatePassPage";
import WardenGatePassPage from "./pages/WardenGatePassPage";
import StudentMessPage from "./pages/StudentMessPage";
import WardenMessPage from "./pages/WardenMessPage";
import StudentGymPage from "./pages/StudentGymPage";
import WardenGymPage from "./pages/WardenGymPage";
import UniversalLostFoundPage from "./pages/UniversalLostFoundPage";
import SecurityGatePassPage from "./pages/SecurityGatePassPage";

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
          <Route path="/admin-rooms" element={<AdminRoomsPage />} />
          <Route path="/admin-maintenance" element={<AdminMaintenancePage />} />
          <Route path="/admin-fees" element={<AdminFeesPage />} />
          <Route path="/housekeeper-dashboard" element={<HousekeeperDashboard />} />
          <Route path="/security-dashboard" element={<SecurityDashboard />} />
          <Route path="/student-maintenance" element={<StudentMaintenancePage />} />
          <Route path="/warden-maintenance" element={<WardenMaintenancePage />} />
          <Route path="/user-complaints" element={<UserComplaintPage />} />
          <Route path="/warden-complaints" element={<WardenComplaintPage />} />
          <Route path="/admin-complaints" element={<WardenComplaintPage fixedRole="Admin" />} />
          <Route path="/nuisance-report" element={<SecurityNuisancePage />} />
          <Route path="/security-gate-pass" element={<SecurityGatePassPage />} />
          
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
          <Route path="/admin-students" element={<WardenStudentsPage fixedRole="Admin" />} />
          <Route path="/rooms" element={<WardenRoomsPage />} />

          {/* New Injected Modules */}
          <Route path="/gate-pass" element={<StudentGatePassPage />} />
          <Route path="/warden-gate-pass" element={<WardenGatePassPage />} />
          <Route path="/admin-gate-pass" element={<WardenGatePassPage fixedRole="Admin" />} />
          <Route path="/mess" element={<StudentMessPage />} />
          <Route path="/warden-mess" element={<WardenMessPage />} />
          <Route path="/admin-mess" element={<WardenMessPage fixedRole="Admin" />} />
          <Route path="/gym" element={<StudentGymPage />} />
          <Route path="/warden-gym" element={<WardenGymPage />} />
          <Route path="/admin-gym" element={<WardenGymPage fixedRole="Admin" />} />
          <Route path="/lost-found" element={<UniversalLostFoundPage fixedRole="Student" />} />
          <Route path="/security-lost-found" element={<UniversalLostFoundPage fixedRole="Security" />} />
          <Route path="/housekeeper-lost-found" element={<UniversalLostFoundPage fixedRole="Housekeeper" />} />
          <Route path="/warden-lost-found" element={<UniversalLostFoundPage fixedRole="Warden" />} />
          <Route path="/admin-lost-found" element={<UniversalLostFoundPage fixedRole="Admin" />} />

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