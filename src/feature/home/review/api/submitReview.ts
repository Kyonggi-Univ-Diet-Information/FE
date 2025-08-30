import { useMutation } from "@tanstack/react-query";
import { REQUEST } from "~/shared/api";
import { userPost } from "~/shared/api/user";

interface SubmitReviewRequest {
  rating: number;
  title: string;
  content: string;
}

interface SubmitReviewProps {
  data: SubmitReviewRequest;
  menuId: number;
}

const submitReview = async ({ data, menuId }: SubmitReviewProps) => {
  const response = await userPost<SubmitReviewRequest>({
    request: REQUEST.postMenuReview + String(menuId),
    data: { ...data },
  });
  return response.data;
};

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: submitReview,
  });
};
