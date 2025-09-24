import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  initializeGA4,
  trackPageView,
  trackEvent,
  trackConversion,
  trackError,
  trackPerformance,
} from "~/shared/utils/ga4";

/**
 * GA4 추적을 위한 커스텀 훅
 */
export const useGA4 = () => {
  const location = useLocation();

  // 앱 초기화 시 GA4 초기화
  useEffect(() => {
    initializeGA4();
  }, []);

  // 라우트 변경 시 페이지 뷰 추적
  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);
};

/**
 * GA4 이벤트 추적을 위한 훅
 */
export const useGA4Event = () => {
  return {
    trackEvent,
    trackConversion,
    trackError,
    trackPerformance,
  };
};
