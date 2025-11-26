import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const createPost = async <T>(
  path: string,
  data: unknown
): Promise<T> => {
  return apiRequest<T>(() => api.post(`${path}`, data));
};
