/**
 * Google Analytics 4 설정
 */
export const GA4_CONFIG = {
  // GA4 측정 ID (환경 변수에서 가져옴)
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-NKEL4R473V',

  // 개발 환경에서 추적 비활성화 여부
  DISABLE_IN_DEV: process.env.NODE_ENV === 'development',

  // 디버그 모드 활성화 여부
  DEBUG_MODE: process.env.NEXT_PUBLIC_GA_DEBUG === 'true',
} as const;

/**
 * GA4 추적이 활성화되어 있는지 확인
 */
export const shouldTrackGA4 = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (GA4_CONFIG.DISABLE_IN_DEV && process.env.NODE_ENV === 'development') {
    return false;
  }
  return !!GA4_CONFIG.MEASUREMENT_ID;
};

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
