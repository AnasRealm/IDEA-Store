import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/refresh-token",
            {
              refresh_token: refreshToken,
            }
          );

          if (response.data.status === 1) {
            const { access_token, refresh_token: newRefreshToken } =
              response.data.data;
            localStorage.setItem("token", access_token);
            localStorage.setItem("refresh_token", newRefreshToken);
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${access_token}`;
            originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Session expired completely", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
