import type { AxiosResponse } from "axios";

export const apiRequest = async <T>(
  request: () => Promise<any>
): Promise<T> => {
  try {
    const response: AxiosResponse = await request();
    console.log("RESPONSE: ", response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
