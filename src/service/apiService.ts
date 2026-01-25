import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const getAllReq = async <T>(path: string): Promise<T> => {
  const response = await apiRequest<T>(() => api.get(`${path}`));
  return response.data;
};

export const postReq = async <T>(path: string, data: unknown): Promise<T> => {
  const response = await apiRequest<T>(() => api.post(`${path}`, data));
  console.log(response);
  return response.data;
};

export const patchReq = async <T>(path: string, data: unknown): Promise<T> => {
  const response = await apiRequest<T>(() => api.patch(`${path}`, data));
  return response.data;
};

export const deleteReq = async (path: string) => {
  console.log(1);
  const response = await apiRequest(() => api.delete(`${path}`));
  console.log("2", response);
  return response;
};
