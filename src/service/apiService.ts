import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const fetchAllReq = async <T>(path: string): Promise<T[]> => {
  return apiRequest(() => api.get(`/${path}`));
};

export const createPostReq = async <T>(
  path: string,
  data: unknown
): Promise<T> => {
  return apiRequest<T>(() => api.post(`${path}`, data));
};
