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

export type Rating = {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
};
