import { type Review } from '@/entities/review/model/review';

export type ReviewPost = Pick<Review, 'rating' | 'title' | 'content'>;
