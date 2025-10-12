import useSWR from 'swr';

import { clientFetcher, ENDPOINT } from '../axios';
import type { BasePagedResponse, Review } from '@/types';

export default function useKsReview() {
  const { data, error, isLoading } = useSWR(
    ENDPOINT.KS_REVIEW_PAGINATION,
    clientFetcher<BasePagedResponse<Review[]>>,
  );

  return {
    reviews: data?.content || [],
    pagination: data?.pageable || {},
    isLoading,
    isError: error,
  };
}
