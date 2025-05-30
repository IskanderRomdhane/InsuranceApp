import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
import icon from "../assets/SiderBar/iconV3.png";

const SideBar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [openMenus, setOpenMenus] = useState({});
  const [activeItem, setActiveItem] = useState("");

  const toggleMenu = (menuId, e) => {
    e.preventDefault();
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 text-orange-200 transition duration-200 group-hover:text-gray-200" />,
      link: "/dashboard",
      hasDropdown: false,
    },
    {
      id: "reclamations",
      title: "Mes Reclamations",
      icon: <FileWarning className="w-5 h-5 text-orange-200 transition duration-200 group-hover:text-gray-200" />,
      hasDropdown: true,
      submenu: [
        {
          title: "Déposer réclamation",
          link: "/reclamations/deposer",
          icon: <Plus className="w-4 h-4 text-orange-200 group-hover:text-gray-200" />,
        },
        {
          title: "Consulter réclamations",
          link: "/reclamations/consulter",
          icon: <List className="w-4 h-4 text-orange-200 group-hover:text-gray-200" />,
        },
      ],
    },
    {
      id: "sinistres",
      title: "Mes sinistres",
      icon: <Umbrella className="w-5 h-5 text-orange-200 transition duration-200 group-hover:text-gray-200" />,
      hasDropdown: true,
      submenu: [
        {
          title: "Créer sinistre",
          link: "/sinistres/creer",
          icon: <Plus className="w-4 h-4 text-orange-200 group-hover:text-gray-200" />,
        },
        {
          title: "Consulter sinistres",
          link: "/sinistres/consulter",
          icon: <List className="w-4 h-4 text-orange-200 group-hover:text-gray-200" />,
        },
      ],
    },
    {
      id: "agences",
      title: "Agences",
      icon: <MapPin className="w-5 h-5 text-orange-200 transition duration-200 group-hover:text-gray-200" />,
      link: "/agences",
      hasDropdown: false,
    },
  ];

  const supportItems = [
    {
      id: "faqs",
      title: "FAQs",
      icon: <HelpCircle className="w-5 h-5 text-orange-200 transition duration-200 group-hover:text-gray-200" />,
      link: "/faqs",
    },
    {
      id: "profile",
      title: "Profile",
      icon: <User className="w-5 h-5 text-orange-200 transition duration-200 group-hover:text-gray-200" />,
      link: "/profil",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const mainItem = [...menuItems, ...supportItems].find(
      (item) => !item.hasDropdown && item.link === currentPath
    );
    if (mainItem) {
      setActiveItem(mainItem.id);
      return;
    }
    for (const item of menuItems) {
      if (item.hasDropdown && item.submenu) {
        const subItem = item.submenu.find((sub) => sub.link === currentPath);
        if (subItem) {
          setActiveItem(item.id);
          setOpenMenus((prev) => ({ ...prev, [item.id]: true }));
          return;
        }
      }
    }
  }, [location.pathname]);

  const isMenuActive = (itemId) => activeItem === itemId;
  const isSubmenuItemActive = (link) => location.pathname === link;

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-[#2e4a44]/50 focus:outline-none focus:ring-2 focus:ring-[#6b8e85]/50"
      >
        <span className="sr-only">Toggle sidebar</span>
        {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        } sm:translate-x-0 flex flex-col bg-[#3a5c54] text-white shadow-lg rounded-r-2xl`}
        aria-label="Sidebar"
      >
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <div className={`flex items-center ps-2 mb-5 ${isOpen ? "justify-between" : "justify-center"}`}>
            {isOpen && (
              <>
                <div className="flex items-center justify-center w-full">
                  <img src={icon} className="h-26 rounded-full border-[#6b8e85]" alt="Wiqaya Logo" />
                </div>
                <button
                  onClick={toggleSidebar}
                  className="hidden sm:block text-white hover:bg-[#2e4a44]/50 rounded-lg p-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}
            {!isOpen && (
              <div className="flex flex-col items-center w-full">
                <img src={icon} className="h-14 rounded-full border-[#6b8e85]" alt="Wiqaya Logo" />
                <button
                  onClick={toggleSidebar}
                  className="hidden sm:block text-white hover:bg-[#2e4a44]/50 rounded-lg p-1 mt-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
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
                        flex items-center justify-between p-2 rounded-lg hover:bg-[#2e4a44]/50 group
                        ${isMenuActive(item.id) ? "bg-[#2e4a44]/70 text-white" : "text-white"}
                        transition-colors duration-200
                      `}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        {isOpen && <span className="ms-3 drop-shadow-sm">{item.title}</span>}
                      </div>
                      {isOpen && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 text-white group-hover:text-gray-200 ${
                            openMenus[item.id] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>
                    {isOpen && openMenus[item.id] && (
                      <ul className="mt-1 space-y-1 ps-4">
                        {item.submenu.map((subItem, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={subItem.link}
                              className={`
                                flex items-center p-2 text-sm rounded-lg hover:bg-[#2e4a44]/50 group
                                ${isSubmenuItemActive(subItem.link) ? "bg-[#2e4a44]/70 text-white" : "text-white"}
                                transition-colors duration-200
                              `}
                            >
                              {subItem.icon}
                              <span className="ms-2 drop-shadow-sm">{subItem.title}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.link}
                    className={`
                      flex items-center p-2 rounded-lg hover:bg-[#2e4a44]/50 group
                      ${isSubmenuItemActive(item.link) ? "bg-[#2e4a44]/70 text-white" : "text-white"}
                      transition-colors duration-200
                    `}
                  >
                    {item.icon}
                    {isOpen && <span className="ms-3 drop-shadow-sm">{item.title}</span>}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 py-4 bg-[#2e4a44]/20 border-t border-[#6b8e85]/30">
          {isOpen && (
            <div className="mb-2 text-sm font-medium text-white drop-shadow-sm px-2">Support & Account</div>
          )}
          <ul className="space-y-2 font-medium">
            {supportItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={`
                    flex items-center p-2 rounded-lg hover:bg-[#2e4a44]/50 group
                    ${isSubmenuItemActive(item.link) ? "bg-[#2e4a44]/70 text-white" : "text-white"}
                    transition-colors duration-200
                  `}
                >
                  {item.icon}
                  {isOpen && <span className="ms-3 drop-shadow-sm">{item.title}</span>}
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