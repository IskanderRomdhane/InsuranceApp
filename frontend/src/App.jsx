import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Root from "./Pages/Root/Root.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Unauthorized from "./Pages/Unauthorized.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";
import Dashboard from './Pages/User/Dashboard.jsx';
import DeposerReclamations from './Pages/User/Reclamations/DeposerReclamations.jsx';
import SideBar from './Components/SideBar.jsx';
import Agences from './Pages/User/Agences/Agences.jsx';
import ConsulterReclamation from './Pages/User/Reclamations/ConsulterReclamation.jsx';
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx';
import AdminSideBar from './Components/AdminSideBar.jsx';
import UsersReclamations from './Pages/Admin/Reclamations/UsersReclamations.jsx';
import ReclamationDetails from './Pages/Admin/Reclamations/ReclamationDetails.jsx';
import Navbar from './Components/Navbar.jsx';
import PasswordPage from "./Pages/Auth/PasswordPage.jsx";
import ChatbotWidget from './Components/ChatbotWidget.jsx';
import ConsulterSinistre from './Pages/User/Sinistres/ConsulterSinistre.jsx';
import CreerSinistres from './Pages/User/Sinistres/CreerSinistres.jsx';
import SinistrePage from './Pages/User/Sinistres/SinistrePage.jsx';
import NotificationsPage from "./Pages/NotificationsPage.jsx";
import NotificationDetail from "./Pages/NotificationDetail.jsx";
import UsersTable from "./Pages/Admin/user managment/UsersTable.jsx";
import UserDetails from "./Pages/Admin/user managment/userDetails.jsx";
import FaqList from "./Components/FaqList.jsx";
import UserSinistres from "./Pages/Admin/Sinistres/UserSinistres.jsx";
import { FAQPage } from "./Components/FAQs/FAQPage.js";
import SinistresTable from "./Pages/Admin/Sinistres/SinistresTable.jsx";
import SinistresDetails from "./Pages/Admin/Sinistres/SinistresDetails.jsx";
import Profil from "./Pages/Profil/Profil.jsx";
import {MyDashboardLayout} from "./Components/dashboard/DashboardLayout.tsx"
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("client_role");
    setRole(storedRole);
  }, []);

  if (!role) return null; 

  const SidebarComponent = role === "client_admin" ? AdminSideBar : SideBar;

  return (
    <div className="flex">
      <SidebarComponent isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {role === "client_user" && <ChatbotWidget />}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {role === "client_user" && <Navbar />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/password" element={<PasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <MyDashboardLayout />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/sinistre"
          element={
            <DashboardLayout>
              <SinistresTable />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/sinistre/details/:id"
          element={
            <DashboardLayout>
              <SinistresDetails />
            </DashboardLayout>
          }
        />
        <Route
          path="/sinistres/creer"
          element={
            <DashboardLayout>
              <CreerSinistres />
            </DashboardLayout>
          }
        />
        <Route
          path="/sinistres/consulter"
          element={
            <DashboardLayout>
              <ConsulterSinistre />
            </DashboardLayout>
          }
        />
        <Route
          path="/sinistres/sinistre/:id"
          element={
            <DashboardLayout>
              <SinistrePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/agences"
          element={
            <DashboardLayout>
              <Agences />
            </DashboardLayout>
          }
        />
        <Route
          path="/faqs"
          element={
            <DashboardLayout>
              <FAQPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/reclamations/deposer"
          element={
            <DashboardLayout>
              <DeposerReclamations />
            </DashboardLayout>
          }
        />
        <Route
          path="/reclamations/consulter"
          element={
            <DashboardLayout>
              <ConsulterReclamation />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/reclamations"
          element={
            <DashboardLayout>
              <UsersReclamations />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/reclamation/:id"
          element={
            <DashboardLayout>
              <ReclamationDetails />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <DashboardLayout>
              <UsersTable />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <DashboardLayout>
              <UserDetails />
            </DashboardLayout>
          }
        />
        <Route
          path="/profil"
          element={
            <DashboardLayout>
              <Profil />
            </DashboardLayout>
          }
        />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notifications/:id" element={<NotificationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
