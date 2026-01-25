import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const getAllReq = async <T>(
  path: string,
): Promise<T> => {
  const response = await apiRequest<T>(() => api.get(`${path}`));
  return response.data;
};

export const postReq = async <T>(
  path: string,
  data: unknown,
): Promise<T> => {
  const response = await apiRequest<T>(() => api.post(`${path}`, data));
  return response.data;
};
