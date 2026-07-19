import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../../services/profileService";
import DashboardLayout from "../../layouts/DashboardLayout";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  
  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h2 className="mb-4">My Profile</h2>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="text-center mb-4">
              <img
                src={
                  user?.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="rounded-circle border"
                width="150"
                height="150"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Full Name:</strong>
                <p>{user?.name}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Email:</strong>
                <p>{user?.email}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Phone:</strong>
                <p>{user?.phone || "N/A"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Department:</strong>
                <p>{user?.department || "N/A"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Role:</strong>
                <p>{user?.role}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <p>{user?.status || "Active"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Joined On:</strong>
                <p>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

     <div className="mt-3 d-flex gap-2">
  <Link to="/profile/update" className="btn btn-primary">
    Update Profile
  </Link>

  <Link to="/profile/change-password" className="btn btn-warning">
    Change Password
  </Link>

  <Link to="/profile/picture" className="btn btn-success">
    Profile Picture
  </Link>
</div>
    </DashboardLayout>
  );
};

export default MyProfile;