import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL as string;

const api = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
