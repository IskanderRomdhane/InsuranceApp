import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Root from "./Pages/Root/Root.jsx"
import Login from './Pages/Auth/Login.jsx'
import Unauthorized from './Pages/Unauthorized.jsx'
import AboutUs from "./Pages/AboutUs.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx"
import Dashboard from './Pages/User/Dashboard.jsx'
import DeposerReclamations from './Pages/User/Reclamations/DeposerReclamations.jsx';
import SideBar from './Components/SideBar.jsx';
import Sinistres from './Pages/User/Sinistres/Sinistres.jsx';
import Agences from './Pages/User/Agences/Agences.jsx';
import ConsulterReclamation from './Pages/User/Reclamations/ConsulterReclamation.jsx';
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx';
import AdminSideBar from './Components/AdminSideBar.jsx';
import { useAuth } from './Hooks/AuthContext.jsx';
import UsersReclamations from './Pages/Admin/Reclamations/UsersReclamations.jsx';
import ReclamationDetails from './Pages/Admin/Reclamations/ReclamationDetails.jsx';
import Navbar from './Components/Navbar.jsx'
const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const role = localStorage.getItem("client_role");
    const SidebarComponent = role === "client_admin" ? AdminSideBar : SideBar;

    return (
        <div className="flex">
            <SidebarComponent isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${
                    sidebarOpen ? 'ml-64' : 'ml-16'
                }`}
            >
                {role === "client_user" && <Navbar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without sidebar */}
        <Route path="/" element={<Root />} />
        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route 
          path='/dashboard' 
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/sinistres' 
          element={
            <DashboardLayout>
              <Sinistres />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/agences' 
          element={
            <DashboardLayout>
              <Agences />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/reclamations/deposer' 
          element={
            <DashboardLayout>
              <DeposerReclamations />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/reclamations/consulter' 
          element={
            <DashboardLayout>
              <ConsulterReclamation />
            </DashboardLayout>
          } 
        />
        <Route
          path='/admin'
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
        <Route 
          path='admin/reclamations'
          element={
            <DashboardLayout>
              <UsersReclamations />
            </DashboardLayout>
          }
          />
          <Route 
          path='admin/reclamation/:id'
          element={
            <DashboardLayout>
              <ReclamationDetails />
            </DashboardLayout>
          }
          />
      </Routes>
    </Router>
  )
}

export default App