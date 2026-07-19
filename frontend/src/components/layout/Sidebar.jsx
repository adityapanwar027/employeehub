import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h3 className="mb-4">EmployeeHub</h3>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/employees" className="nav-link text-white">
            Employees
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/departments" className="nav-link text-white">
            Departments
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/profile" className="nav-link text-white">
            My Profile
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/documents/upload" className="nav-link text-white">
            Upload Documents
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;