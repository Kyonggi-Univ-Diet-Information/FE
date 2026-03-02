/** GA4 Measurement ID */
export const GA4_MEASUREMENT_ID = 'G-NKEL4R473V';

/**
 * Google Analytics 4 설정
 */
export const GA4_CONFIG = {
  MEASUREMENT_ID: GA4_MEASUREMENT_ID,

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
 * Google Analytics 4 이벤트 타입 정의
 */
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

/** gtag 전역 타입 확장 */
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
