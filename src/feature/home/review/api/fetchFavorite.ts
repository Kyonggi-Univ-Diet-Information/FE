import { useQuery } from "@tanstack/react-query";
import { get, REQUEST, userGet } from "~/shared/api";
import { getCookie } from "~/shared/utils";

const fetchFavCnt = async (menuId: number) => {
  const response = await get<number>({
    request: REQUEST.fetchReviewFav + String(menuId),
  });
  return response.data;
};

export const useFetchFavCnt = (reviewId: number) => {
  return useQuery({
    queryKey: ["reviewFavCnt", reviewId],
    queryFn: () => fetchFavCnt(reviewId),
    staleTime: 1000 * 60 * 5,
  });
};

const fetchMemberFav = async () => {
  const response = await userGet({
    request: REQUEST.fetchMemberFav,
  });
  return response.data;
};

export const useFetchMemberFav = () => {
  return useQuery({
    queryKey: ["fetchMemberCnt"],
    queryFn: fetchMemberFav,
    enabled: !!getCookie("token"),
  });
};
