import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getMyProfile,
  updateProfile,
} from "../../services/profileService";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();

      setFormData({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(formData);
      alert(res.message);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h2 className="mb-4">Update Profile</h2>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UpdateProfile;