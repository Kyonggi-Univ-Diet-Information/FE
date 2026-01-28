import { FoodCourt } from '@/shared/config';

export type Review = {
  id: number;
  rating: number;
  title: string;
  content: string;
  memberName: string;
  createdAt: string;
  updatedAt: string;
  myReview: boolean;
};

export type RecentReview = Pick<
  Review,
  'memberName' | 'rating' | 'title' | 'content' | 'createdAt' | 'myReview'
> & {
  foodId: number;
  reviewId: number;
  restaurantType: FoodCourt;
};

export type ReviewPost = Pick<Review, 'rating' | 'title' | 'content'>;

export type Rating = {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
};
