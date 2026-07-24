import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserShield,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaKey,
  FaCamera,
} from "react-icons/fa";

import { getMyProfile } from "../../services/profileService";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./MyProfile.css";

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
        <div className="profile-loading">
          Loading Profile...
        </div>
      </DashboardLayout>
    );
  }
    return (
    <DashboardLayout>
      <motion.div
        className="profile-page"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-card">

          <div className="profile-header">

            <div className="profile-avatar">

              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                />
              ) : (
                <FaUserCircle />
              )}

            </div>

            <div className="profile-title">
              <h1>{user?.name}</h1>

              <span className="role-badge">
                <FaUserShield />
                {user?.role}
              </span>

              <span className="status-badge">
                <FaCheckCircle />
                {user?.status || "Active"}
              </span>
            </div>

          </div>

          <div className="profile-grid">

            <div className="info-card">
              <FaEnvelope className="info-icon" />
              <div>
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="info-card">
              <FaPhone className="info-icon" />
              <div>
                <label>Phone</label>
                <p>{user?.phone || "N/A"}</p>
              </div>
            </div>

            <div className="info-card">
              <FaBuilding className="info-icon" />
              <div>
                <label>Department</label>
                <p>{user?.department || "N/A"}</p>
              </div>
            </div>

            <div className="info-card">
              <FaCalendarAlt className="info-icon" />
              <div>
                <label>Joined On</label>
                <p>
                  {user?.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

          </div>

          <div className="profile-actions">

            <Link
              to="/profile/update"
              className="profile-btn blue"
            >
              <FaEdit />
              Update Profile
            </Link>

            <Link
              to="/profile/change-password"
              className="profile-btn yellow"
            >
              <FaKey />
              Change Password
            </Link>

            <Link
              to="/profile/picture"
              className="profile-btn green"
            >
              <FaCamera />
              Profile Picture
            </Link>

          </div>

        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MyProfile;