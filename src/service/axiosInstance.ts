import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

const URL =
  import.meta.env.VITE.NODE_ENV === "DEV"
    ? import.meta.env.VITE.BASE_URL
    : import.meta.env.VITE.BASE_URL_PRODUCTION;

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const result = await useAuthStore.getState().refresh();
        if (result) {
          console.log("token: ", result.token);
          error.config.headers.Authorization = `Bearer ${result.token}`;
        }
        return api(error.config);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
