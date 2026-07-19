import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { uploadProfilePicture } from "../../services/profileService";

const ProfilePicture = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      const res = await uploadProfilePicture(formData);
      alert(res.message);
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h2 className="mb-4">Profile Picture</h2>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Select Profile Picture</label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Upload Picture
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePicture;