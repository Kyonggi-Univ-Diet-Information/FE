export type Review = {
  id: number;
  rating: number;
  title: string;
  content: string;
  memberName: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewPost = Pick<Review, 'rating' | 'title' | 'content'>;
