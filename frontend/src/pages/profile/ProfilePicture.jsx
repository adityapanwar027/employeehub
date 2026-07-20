import { useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import { uploadProfilePicture } from "../../services/profileService";

const ProfilePicture = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      setLoading(true);

      const res = await uploadProfilePicture(formData);

      toast.success(res.message);

      setImage(null);
      e.target.reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontWeight: "bold",
            color: "#212529",
          }}
        >
          Upload Profile Picture
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Select Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {image && (
            <p
              style={{
                margin: 0,
                color: "#6c757d",
                fontSize: "14px",
              }}
            >
              Selected: <strong>{image.name}</strong>
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              background: "#198754",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Uploading..." : "Upload Picture"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePicture;