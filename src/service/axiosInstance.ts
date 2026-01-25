import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

// const URL = import.meta.env.VITE_BASE_URL as string;
const URL = "http://localhost:5023/api/v1";
const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let flag = 1;
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.retry) {
      flag = 2;
      originalRequest.retry = true;
      if (originalRequest.url === "/auth/refresh") return Promise.reject(error);
      try {
        const result = await useAuthStore.getState().refresh();
        if (result?.token) {
          originalRequest.headers.Authorization = `Bearer ${result.token}`;
          return api(originalRequest);
        }
      } catch (error) {
        useAuthStore.getState().setUserState(null, null);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
