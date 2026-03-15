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

/**
 * 일반 이벤트 추적
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown> | object,
): void => {
  if (!shouldTrackGA4() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params as Record<string, unknown>);

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log('[GA4] Event tracked:', eventName, params);
  }
};

/**
 * 전환 이벤트 추적 (중요한 사용자 행동)
 */
export const trackConversion = (
  eventName: string,
  params?: Record<string, unknown> | object,
): void => {
  trackEvent(eventName, {
    ...params,
    send_to: GA4_CONFIG.MEASUREMENT_ID,
  });
};

/**
 * 메뉴 클릭 이벤트 추적
 */
export const trackMenuClick = (params: MenuClickEvent): void => {
  trackEvent('menu_click', {
    ...params,
    is_mobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
  });
};

/**
 * 평점 선택 이벤트 추적
 */
export const trackRatingSelect = (params: RatingSelectEvent): void => {
  trackEvent('rating_select', {
    ...params,
    language: navigator.language || 'ko',
  });
};

/**
 * 리뷰 작성 성공 이벤트 추적 (전환 이벤트)
 */
export const trackReviewSubmitSuccess = (params: ReviewSubmitEvent): void => {
  trackConversion('review_submit_success', {
    ...params,
    language: navigator.language || 'ko',
  });
};

/**
 * 리뷰 작성 실패 이벤트 추적
 */
export const trackReviewSubmitError = (params: ErrorEvent): void => {
  trackEvent('review_submit_error', params);
};

/**
 * 리뷰 좋아요 추가 이벤트 추적
 */
export const trackReviewLike = (params: ReviewLikeEvent): void => {
  trackEvent('review_like', params);
};

/**
 * 리뷰 좋아요 취소 이벤트 추적
 */
export const trackReviewUnlike = (
  params: Omit<ReviewLikeEvent, 'content_length'>,
): void => {
  trackEvent('review_unlike', params);
};

/**
 * 리뷰 좋아요 실패 이벤트 추적
 */
export const trackReviewLikeError = (params: ErrorEvent): void => {
  trackEvent('review_like_error', params);
};

/**
 * 에러 이벤트 추적
 */
export const trackError = (params: ErrorEvent): void => {
  trackEvent('error', params);
};

/**
 * 페이지뷰 추적 (수동)
 * - layout에서 GA4 스크립트 로드 후 필요 시 수동 호출
 *   필요한 경우 수동으로 호출 가능
 */
export const trackPageView = (url: string): void => {
  if (!shouldTrackGA4() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', GA4_CONFIG.MEASUREMENT_ID, {
    page_path: url,
  });

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log('[GA4] Page view tracked:', url);
  }
};
