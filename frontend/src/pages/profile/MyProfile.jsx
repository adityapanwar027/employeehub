import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyProfile } from "../../services/profileService";
import DashboardLayout from "../../layouts/DashboardLayout";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getMyProfile();
      setUser(data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <h3
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Loading profile...
        </h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontWeight: "bold",
            color: "#212529",
          }}
        >
          My Profile
        </h2>

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #0d6efd",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div>
            <strong>Full Name</strong>
            <p>{user?.name}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{user?.email}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{user?.phone || "N/A"}</p>
          </div>

          <div>
            <strong>Department</strong>
            <p>{user?.department || "N/A"}</p>
          </div>

          <div>
            <strong>Role</strong>
            <p>{user?.role}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{user?.status || "Active"}</p>
          </div>

          <div>
            <strong>Joined On</strong>
            <p>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/profile/update"
            style={{
              background: "#0d6efd",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Update Profile
          </Link>

          <Link
            to="/profile/change-password"
            style={{
              background: "#ffc107",
              color: "#212529",
              padding: "10px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Change Password
          </Link>

          <Link
            to="/profile/picture"
            style={{
              background: "#198754",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Profile Picture
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyProfile;