import { useQuery } from "@tanstack/react-query";
import { get, REQUEST } from "~/shared/api";
import { Review } from "../types";

const fetchReview = async (menuId: number) => {
  const response = await get<Review[]>({
    request: REQUEST.fetchMenuReview + String(menuId),
  });
  return response.data;
};

export const useFetchReview = (menuId: number) => {
  return useQuery({
    queryKey: ["review", menuId],
    queryFn: () => fetchReview(menuId),
    staleTime: 5 * 60 * 1000,
    enabled: !!menuId,
  });
};
