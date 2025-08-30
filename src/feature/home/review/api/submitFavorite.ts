import { useMutation } from "@tanstack/react-query";
import { REQUEST, userDel, userPost } from "~/shared/api";

const submitReviewFav = async (reviewId: number) => {
  const response = await userPost({
    request: REQUEST.toggleReviewFav + reviewId + "/create-favorite",
  });
  return response.data;
};

export const useSubmitReviewFav = () => {
  return useMutation({
    mutationFn: submitReviewFav,
  });
};

const deleteReviewFav = async (reviewId: number) => {
  const response = await userDel({
    request: REQUEST.toggleReviewFav + "delete/" + reviewId,
  });
  return response.data;
};

export const useDeleteReviewFav = () => {
  return useMutation({
    mutationFn: deleteReviewFav,
  });
};
