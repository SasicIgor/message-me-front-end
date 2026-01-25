import { getAllReq } from "@/service/apiService";
import { useQuery } from "@tanstack/react-query";

export const useGetItems = <T>(queryKey: string[]): T[] => {
  const fallback: T[] = [];

  const path = queryKey.join("/");

  const { data = fallback } = useQuery<T[]>({
    queryKey,
    queryFn: () => getAllReq<T[]>(path),
  });

  return data;
};