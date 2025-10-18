import { GA4_CONFIG, shouldTrackGA4 } from '@/shared/ga4';
import type {
  MenuClickEvent,
  RatingSelectEvent,
  ReviewSubmitEvent,
  ReviewLikeEvent,
  ErrorEvent,
} from '@/shared/ga4';

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
 * - 일반적으로 GoogleAnalytics 컴포넌트가 자동으로 처리하지만,
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
