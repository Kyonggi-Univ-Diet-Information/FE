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
    queryKey: ["fetchMemberFav"],
    queryFn: fetchMemberFav,
    enabled: !!getCookie("token"),
  });
};

const fetchBatchFavCounts = async (reviewIds: number[]) => {
  const promises = reviewIds.map((id) => fetchFavCnt(id));
  const results = await Promise.all(promises);
  return reviewIds.reduce(
    (acc, id, index) => {
      acc[id] = results[index];
      return acc;
    },
    {} as Record<number, number>,
  );
};

export const useFetchBatchFavCounts = (reviewIds: number[]) => {
  return useQuery({
    queryKey: ["batchFavCounts", reviewIds],
    queryFn: () => fetchBatchFavCounts(reviewIds),
    enabled: reviewIds.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};
