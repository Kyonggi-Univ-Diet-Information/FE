/**
 * Google Analytics 4 타입 정의
 */

export type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export type MenuClickEvent = {
  menu_id: string;
  menu_name: string;
  time_slot: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  is_mobile: boolean;
  selected_date: string;
};

export type RatingSelectEvent = {
  rating: number;
  menu_id: string;
  language: string;
};

export type ReviewSubmitEvent = {
  menu_id: string;
  rating: number;
  content_length: number;
  language: string;
};

export type ReviewLikeEvent = {
  review_id: string;
  review_rating: number;
  content_length?: number;
};

export type ErrorEvent = {
  error_message: string;
  error_type?: string;
  page?: string;
};

export type GAEvent =
  | { event_name: 'menu_click'; params: MenuClickEvent }
  | { event_name: 'rating_select'; params: RatingSelectEvent }
  | { event_name: 'review_submit_success'; params: ReviewSubmitEvent }
  | { event_name: 'review_submit_error'; params: ErrorEvent }
  | { event_name: 'review_like'; params: ReviewLikeEvent }
  | {
      event_name: 'review_unlike';
      params: Omit<ReviewLikeEvent, 'content_length'>;
    }
  | { event_name: 'review_like_error'; params: ErrorEvent }
  | { event_name: 'error'; params: ErrorEvent };

// gtag 타입 확장
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer: Array<unknown>;
  }
}

export {};
