import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  FileWarning,
  Umbrella,
  MapPin,
  HelpCircle,
  User,
  Plus,
  List,
} from "lucide-react";
import icon from "../assets/SiderBar/icon.jpg";

const SideBar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // State to track which dropdown menus are open
  const [openMenus, setOpenMenus] = useState({});

  // Toggle dropdown menu open/closed
  const toggleMenu = (menuId, e) => {
    e.preventDefault();
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  // Define the menu structure with dropdowns
  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: (
        <LayoutDashboard className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
      ),
      link: "/dashboard",
      hasDropdown: false,
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 text-[#476f66] transition duration-75 group-hover:text-[#3e6159]" />,
      link: '/dashboard',
      hasDropdown: false
    },
    {
      id: "reclamations",
      title: "Mes Reclamations",
      icon: (
        <FileWarning className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
      ),
      id: 'reclamations',
      title: 'Mes Reclamations',
      icon: <FileWarning className="w-5 h-5 text-[#476f66] transition duration-75 group-hover:text-[#3e6159]" />,
      hasDropdown: true,
      submenu: [
        {
          title: "Déposer réclamation",
          link: "/reclamations/deposer",
          icon: <Plus className="w-4 h-4" />,
        },
        {
          title: "Consulter réclamations",
          link: "/reclamations/consulter",
          icon: <List className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "sinistres",
      title: "Mes sinistres",
      icon: (
        <Umbrella className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
      ),
      id: 'sinistres',
      title: 'Mes sinistres',
      icon: <Umbrella className="w-5 h-5 text-[#476f66] transition duration-75 group-hover:text-[#3e6159]" />,
      hasDropdown: true,
      submenu: [
        {
          title: "Créer sinistre",
          link: "/sinistres/creer",
          icon: <Plus className="w-4 h-4" />,
        },
        {
          title: "Consulter sinistres",
          link: "/sinistres/consulter",
          icon: <List className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "agences",
      title: "Agences",
      icon: (
        <MapPin className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
      ),
      link: "/agences",
      hasDropdown: false,
    },
      id: 'agences',
      title: 'Agences',
      icon: <MapPin className="w-5 h-5 text-[#476f66] transition duration-75 group-hover:text-[#3e6159]" />,
      link: '/agences',
      hasDropdown: false
    }
  ];

  const supportItems = [
    {
      id: "faqs",
      title: "FAQs",
      icon: (
        <HelpCircle className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
      ),
      link: "/faqs",
      hasDropdown: false,
      id: 'faqs',
      title: 'FAQs',
      icon: <HelpCircle className="w-5 h-5 text-[#476f66] transition duration-75 group-hover:text-[#3e6159]" />,
      link: '#',
      hasDropdown: false
    },
    {
      id: "profile",
      title: "Profile",
      icon: (
        <User className="w-5 h-5 text-green-600 transition duration-75 group-hover:text-green-800" />
      ),
      link: "#",
      hasDropdown: false,
    },
      id: 'profile',
      title: 'Profile',
      icon: <User className="w-5 h-5 text-[#476f66] transition duration-75 group-hover:text-[#3e6159]" />,
      link: '#',
      hasDropdown: false
    }
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-[#3e6159] rounded-lg sm:hidden hover:bg-[#f5f8f7] focus:outline-none focus:ring-2 focus:ring-[#476f66]"
      >
        <span className="sr-only">Toggle sidebar</span>
        {isOpen ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <ChevronRight className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        } sm:translate-x-0 flex flex-col`}
        aria-label="Sidebar"
      >
        <div className="flex-1 px-3 py-4 overflow-y-auto bg-white shadow-xl">
          <div
            className={`flex items-center ps-2 mb-5 ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen && (
              <>
                <div className="flex items-center">
                  <img src={icon} className="h-12" alt="Wiqaya Logo" />
                </div>
                <button
                  onClick={toggleSidebar}
                  className="hidden sm:block text-[#3e6159] hover:text-[#476f66] rounded-lg p-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}
            {!isOpen && (
              <>
                <button
                  onClick={toggleSidebar}
                  className="hidden sm:block text-[#3e6159] hover:bg-[#476f66] hover:text-white rounded-lg p-1 mt-4"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.hasDropdown ? (
                  <div>
                    <a
                      href="#"
                      onClick={(e) => toggleMenu(item.id, e)}
                      className={`
                        flex items-center justify-between p-2 rounded-lg hover:bg-green-100 group
                        ${
                          openMenus[item.id]
                            ? "bg-green-200 text-green-900"
                            : "text-green-800"
                        }
                        flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f8f7] group
                        ${openMenus[item.id] ? 'bg-[#e8efed] text-[#3e6159]' : 'text-[#3e6159]'}
                      `}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        {isOpen && <span className="ms-3">{item.title}</span>}
                      </div>
                      {isOpen && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openMenus[item.id] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>

                    {/* Submenu */}
                    {isOpen && openMenus[item.id] && (
                      <ul className="mt-1 space-y-1 ps-4">
                        {item.submenu.map((subItem, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={subItem.link}
                              className={({ isActive }) => `
                                flex items-center p-2 text-sm rounded-lg hover:bg-[#f5f8f7] group
                                ${isActive ? 'bg-[#e8efed] text-[#3e6159]' : 'text-[#3e6159]'}
                                flex items-center p-2 text-sm rounded-lg hover:bg-green-100 group
                                ${
                                  isActive
                                    ? "bg-green-200 text-green-900"
                                    : "text-green-800"
                                }
                              `}
                            >
                              <span className="w-4 h-4 text-[#476f66] transition duration-75 group-hover:text-[#3e6159] mr-2">
                                {subItem.icon}
                              </span>
                              <span>{subItem.title}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => `
                      flex items-center p-2 rounded-lg hover:bg-[#f5f8f7] group
                      ${isActive ? 'bg-[#e8efed] text-[#3e6159]' : 'text-[#3e6159]'}
                      flex items-center p-2 rounded-lg hover:bg-green-100 group
                      ${
                        isActive
                          ? "bg-green-200 text-green-900"
                          : "text-green-800"
                      }
                    `}
                  >
                    {item.icon}
                    {isOpen && <span className="ms-3">{item.title}</span>}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom section for FAQs and Profile */}
        <div className="px-3 py-4 bg-white border-t border-gray-300">
          {isOpen && <div className="mb-2 text-sm font-medium text-[#3e6159] px-2">Support & Account</div>}
          {isOpen && (
            <div className="mb-2 text-sm font-medium text-green-800 px-2">
              Support & Account
            </div>
          )}
          <ul className="space-y-2 font-medium">
            {supportItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) => `
                    flex items-center p-2 rounded-lg hover:bg-[#f5f8f7] group text-[#476f66]
                  `}
                >
                  {item.icon}
                  {isOpen && <span className="ms-3">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
