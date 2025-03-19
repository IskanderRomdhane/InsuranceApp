import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutDashboard, FileWarning, Umbrella, MapPin, HelpCircle, User } from 'lucide-react';
import icon from '../assets/SiderBar/icon.jpg'
const SideBar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-green-800 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <span className="sr-only">Toggle sidebar</span>
        {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>
      
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        } sm:translate-x-0 flex flex-col`} 
        aria-label="Sidebar"
      >
        <div className="flex-1 px-3 py-4 overflow-y-auto bg-green-50">
          <div className={`flex items-center ps-2 mb-5 ${isOpen ? 'justify-between' : 'justify-center'}`}>
            {isOpen && (
              <>
                <div className="flex items-center">
                  <img src={icon} className="h-12" alt="Wiqaya Logo" />
                </div>
                <button 
                  onClick={toggleSidebar}
                  className="hidden sm:block text-green-800 hover:bg-green-100 rounded-lg p-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}
            {!isOpen && (
              <>
                <button 
                  onClick={toggleSidebar}
                  className="hidden sm:block text-green-800 hover:bg-green-100 rounded-lg p-1 mt-4"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink 
                to="/reclamations" 
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg hover:bg-green-100 group
                  ${isActive ? 'bg-green-200 text-green-900' : 'text-green-800'}
                `}
              >
                <FileWarning className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
                {isOpen && <span className="ms-3">Mes Reclamations</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg hover:bg-green-100 group
                  ${isActive ? 'bg-green-200 text-green-900' : 'text-green-800'}
                `}
              >
                <LayoutDashboard className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
                {isOpen && <span className="ms-3">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/sinistres" 
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg hover:bg-green-100 group
                  ${isActive ? 'bg-green-200 text-green-900' : 'text-green-800'}
                `}
              >
                <Umbrella className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
                {isOpen && <span className="ms-3">Mes sinistres</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/agences" 
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg hover:bg-green-100 group
                  ${isActive ? 'bg-green-200 text-green-900' : 'text-green-800'}
                `}
              >
                <MapPin className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
                {isOpen && <span className="ms-3">Agences</span>}
              </NavLink>
            </li>
          </ul>
        </div>
        
        {/* Bottom section for FAQs and Profile */}
        <div className="px-3 py-4 bg-green-100 border-t border-green-200">
          {isOpen && <div className="mb-2 text-sm font-medium text-green-800 px-2">Support & Account</div>}
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink 
                to="#" 
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg hover:bg-green-200 group
                  ${isActive ? 'bg-green-300 text-green-900' : 'text-green-800'}
                `}
              >
                <HelpCircle className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
                {isOpen && <span className="ms-3">FAQs</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="#" 
                className={({ isActive }) => `
                  flex items-center p-2 rounded-lg hover:bg-green-200 group
                  ${isActive ? 'bg-green-300 text-green-900' : 'text-green-800'}
                `}
              >
                <User className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
                {isOpen && <span className="ms-3">Profile</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;