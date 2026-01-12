import api from "../../../api/axios";
export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
export const getGoogleAuthUrl = async () => {
  const response = await api.get("/auth/continue-with-google");
  return response.data;
};
export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};
export const resetPassword = async ({
  email,
  token,
  password,
  password_confirmation,
}) => {
  const response = await api.post("/reset-password", {
    email,
    token,
    password,
    password_confirmation,
  });
  return response.data;
};
export const resendVerificationEmail = async () => {
  const response = await api.post("/email/resend-verification");
  return response.data;
};
