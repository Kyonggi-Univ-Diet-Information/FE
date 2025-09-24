import { create } from "zustand";

interface ReviewStore {
  newReview: string | null;
  setNewReview: (review: string) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  newReview: null,
  setNewReview: (review: string) => set(() => ({ newReview: review })),
}));
