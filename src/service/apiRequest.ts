import type { AxiosResponse } from "axios";

export const apiRequest = async <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request();
    console.log("RESPONSE: ", response);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if(error instanceof Error) throw Error;
    throw new Error("Unknown error!");
  }
};
