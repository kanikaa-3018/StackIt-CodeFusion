import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "@/utils/tokenManager";
import { getBackendUrl } from "@/utils/getBackendUrl";

const api = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  console.log("Sending token in header:", token); 
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/users/login") ||
      originalRequest.url.includes("/users/refresh_access_token")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${getBackendUrl()}/refresh_access_token`,
          {},
          { withCredentials: true }
        );

        console.log("Refresh token response:", res.data);

        const newAccessToken = res.data?.jwt_token;
        if (!newAccessToken) {
          throw new Error("No token in refresh response");
        }

        setAccessToken(newAccessToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
