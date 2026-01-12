import api from "../../../api/axios";

export const fetchUserProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.post("/profile", userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const changeUserPassword = async (passwordData) => {
  const response = await api.post("/change-password", passwordData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};
export const fetchMyListings = async (page = 1) => {
  const response = await api.get(`/user/marketplace/my-listings?page=${page}`);
  return response.data;
};
export const fetchUserStatistics = async () => {
  const response = await api.get("/user/statistics");
  return response.data;
};
