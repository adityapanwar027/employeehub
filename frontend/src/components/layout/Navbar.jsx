import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h2>Dashboard</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          My Profile
        </Link>

        <p style={{ margin: 0 }}>Welcome, {user?.name}</p>
      </div>
    </div>
  );
}

export default Navbar;