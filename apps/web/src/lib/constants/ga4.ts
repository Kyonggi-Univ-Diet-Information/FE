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
