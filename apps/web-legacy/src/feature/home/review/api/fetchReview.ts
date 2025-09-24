import { useQuery } from "@tanstack/react-query";
import { get, REQUEST } from "~/shared/api";
import { Review } from "../types";
import { useState, useCallback } from "react";

interface FetchReviewResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  content: Review[];
}

const fetchReview = async (menuId: number, page: number = 0) => {
  const response = await get<FetchReviewResponse>({
    request:
      REQUEST.fetchMenuReviewPagination + String(menuId) + `?pageNo=${page}`,
    params: {
      pageNo: page,
    },
  });
  return response.data;
};

export const useFetchReview = (menuId: number, page: number = 0) => {
  return useQuery({
    queryKey: ["review", menuId, page],
    queryFn: () => fetchReview(menuId, page),
    staleTime: 5 * 60 * 1000,
    enabled: !!menuId,
  });
};

export const useReviewPagination = (menuId: number, size: number = 10) => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useFetchReview(menuId, currentPage);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goToNextPage = useCallback(() => {
    if (reviewData && !reviewData.last) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [reviewData]);

  const goToPrevPage = useCallback(() => {
    if (reviewData && !reviewData.first) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [reviewData]);

  const resetPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
    reviews: reviewData?.content || [],
    pagination: {
      currentPage,
      totalPages: reviewData?.totalPages || 0,
      totalElements: reviewData?.totalElements || 0,
      isFirst: reviewData?.first || false,
      isLast: reviewData?.last || false,
      size: reviewData?.size || size,
    },
    isLoading,
    isError,
    goToPage,
    goToNextPage,
    goToPrevPage,
    resetPage,
  };
};
