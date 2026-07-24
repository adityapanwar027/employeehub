import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaUserCircle,
  FaFileUpload,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },
    {
      name: "Departments",
      path: "/departments",
      icon: <FaBuilding />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
    {
      name: "Upload Documents",
      path: "/documents/upload",
      icon: <FaFileUpload />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>EmployeeHub</h2>
        <p>HR Management</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;