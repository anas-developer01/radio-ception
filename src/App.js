
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import SuperAdminDashboardHome from './pages/SuperAdminDashboardHome';
import SuperAdminAdmins from './pages/SuperAdminAdmins';
import SuperAdminSubscription from './pages/SuperAdminSubscription';
import AdminDashboard from './pages/AdminDashboard';
import AdminDashboardHome from './pages/AdminDashboardHome';
import AdminSubscription from './pages/AdminSubscription';
import AdminUpload from './pages/AdminUpload';
import XrayAnalysisPage from './pages/XrayAnalysisPage';
import AdminReports from './pages/AdminReports';
import AdminMedgamma from './pages/AdminMedgamma';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About';
import Certifications from './components/Certifications';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

// Remove placeholder components, now using real ones
const SignUp = () => <Register />;




function AppRoutes() {
  const location = useLocation();
  // Hide NavBar/Footer on admin, superadmin, and auth pages
  const authRoutes = ['/login', '/register', '/signup', '/verify-otp', '/reset-password', '/new-password'];
  const hideNavBar =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/superadmin') ||
    authRoutes.some((route) => location.pathname.startsWith(route));
  return (
    <>
      {!hideNavBar && <NavBar />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />}>
            <Route index element={<SuperAdminDashboardHome />} />
            <Route path="admins" element={<SuperAdminAdmins />} />
            <Route path="subscription" element={<SuperAdminSubscription />} />
            <Route path="upload" element={<AdminUpload />} />
            <Route path="reports" element={<div>System Reports</div>} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="patients" element={<AdminDashboardHome />} />
            <Route path="subscription" element={<AdminSubscription />} />
            <Route path="upload" element={<AdminUpload />} />
            <Route path="xray-analysis" element={<XrayAnalysisPage />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="medgamma-api" element={<AdminMedgamma />} />
            <Route path="report-download" element={<AdminReports />} />
          </Route>
        </Routes>
      </div>
      {!hideNavBar && <Footer />}
    </>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
