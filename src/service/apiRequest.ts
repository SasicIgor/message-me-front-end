import type { BaseResponse } from "@/types/responseTypes";
import type { AxiosResponse } from "axios";

export const apiRequest = async <T>(
  request: () => Promise<AxiosResponse<BaseResponse<T>>>
): Promise<BaseResponse<T>> => {
  try {
    const response = await request();
    console.log("RESPONSE: ", response);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) throw Error;
    throw new Error("Unknown error!");
  }
};
