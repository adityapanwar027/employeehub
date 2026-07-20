import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees" },
    { name: "Departments", path: "/departments" },
    { name: "My Profile", path: "/profile" },
    { name: "Upload Documents", path: "/documents/upload" },
  ];

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#212529",
        color: "#fff",
        padding: "20px 15px",
        position: "sticky",
        top: 0,
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        EmployeeHub
      </h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {menuItems.map((item) => (
          <li key={item.path} style={{ marginBottom: "10px" }}>
            <Link
              to={item.path}
              style={{
                display: "block",
                padding: "12px 15px",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#fff",
                backgroundColor:
                  location.pathname === item.path ? "#0d6efd" : "transparent",
                transition: "0.3s",
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;