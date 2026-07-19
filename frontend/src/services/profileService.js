import api from "./axios";

export const getMyProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/profile/update", profileData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/profile/change-password",
    passwordData
  );
  return response.data;
};

export const uploadProfilePicture = async (formData) => {
  const response = await api.post("/profile/upload-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};