import api from "../../../api/axios";

export const fetchDashboardData = async () => {
  const response = await api.get("/user/dashboard");
  return response.data;
};
