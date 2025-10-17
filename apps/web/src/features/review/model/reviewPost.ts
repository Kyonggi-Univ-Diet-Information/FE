import { Review } from '@/entities/campus-review/model/review';

export type ReviewPost = Pick<Review, 'rating' | 'title' | 'content'>;

export type MenuType = 'campus' | 'dorm';
