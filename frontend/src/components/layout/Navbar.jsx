import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#fff",
        borderBottom: "1px solid #dee2e6",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#0d6efd",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            color: "#212529",
            fontWeight: "600",
          }}
        >
          My Profile
        </Link>

        <span
          style={{
            fontWeight: "500",
            color: "#495057",
          }}
        >
          Welcome, {user?.name || "User"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;