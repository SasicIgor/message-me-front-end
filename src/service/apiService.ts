import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const createPost = async <T>(path: string, data: T) => {

  return apiRequest(() => api.post(`${path}`, data));
};
