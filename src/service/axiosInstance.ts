import { getAccesCookie } from "@/utils/cookie";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL as string;
const token = getAccesCookie();
const api = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
