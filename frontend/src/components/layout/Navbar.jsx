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

      <p>Welcome, {user?.name}</p>
    </div>
  );
}

export default Navbar;