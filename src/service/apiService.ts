import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const fetchAllReq = async <T>(path: string): Promise<T[]> => {
  const req = await apiRequest(() => api.get(`${path}`));
  console.log("FEATCH ALL: ", req);
  return req.data as T[];
};

export const createPostReq = async <T>(
  path: string,
  data: unknown
): Promise<T> => {
  return apiRequest<T>(() => api.post(`${path}`, data));
};
