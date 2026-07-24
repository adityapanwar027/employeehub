import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div>
        <h2 className="navbar-title">Dashboard</h2>
        <p className="navbar-subtitle">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="navbar-right">
        <div className="notification">
          <FaBell />
        </div>

        <Link to="/profile" className="profile-link">
          <FaUserCircle className="profile-icon" />
          <div>
            <span className="profile-name">
              {user?.name || "User"}
            </span>
            <small>Administrator</small>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;