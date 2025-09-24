import { GA4_CONFIG, shouldTrackGA4 } from "~/shared/config/ga4";

/**
 * Google Analytics 4 유틸리티 함수들
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * GA4 스크립트 로드 함수
 */
const loadGA4Script = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.MEASUREMENT_ID}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("GA4 스크립트 로드 실패"));
    document.head.appendChild(script);
  });
};

/**
 * GA4 초기화 함수
 */
export const initializeGA4 = async () => {
  if (!shouldTrackGA4()) {
    return;
  }

  // gtag 함수가 이미 로드되었는지 확인
  if (typeof window.gtag === "function") {
    console.log("GA4가 이미 초기화되었습니다.");
    return;
  }

  try {
    // GA4 스크립트 로드
    await loadGA4Script();

    // dataLayer 초기화
    window.dataLayer = window.dataLayer || [];

    // gtag 함수 정의
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

    // 현재 시간으로 타임스탬프 설정
    window.gtag("js", new Date());
    window.gtag("config", GA4_CONFIG.MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      debug_mode: GA4_CONFIG.DEBUG_MODE,
    });

    console.log("GA4가 성공적으로 초기화되었습니다.");
  } catch (error) {
    console.error("GA4 초기화 실패:", error);
  }
};

/**
 * 페이지 뷰 추적
 */
export const trackPageView = (url?: string, title?: string) => {
  if (!shouldTrackGA4() || !window.gtag) {
    return;
  }

  const pageData = {
    page_title: title || document.title,
    page_location: url || window.location.href,
    page_path: url || window.location.pathname,
  };

  window.gtag("config", GA4_CONFIG.MEASUREMENT_ID, pageData);

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log("페이지 뷰 추적:", pageData);
  }
};

/**
 * 커스텀 이벤트 추적
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>,
) => {
  if (!shouldTrackGA4() || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, {
    ...parameters,
    event_category: parameters?.event_category || "engagement",
    event_label: parameters?.event_label || "",
    value: parameters?.value || 0,
  });

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log("이벤트 추적:", eventName, parameters);
  }
};

/**
 * 사용자 속성 설정
 */
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (!shouldTrackGA4() || !window.gtag) {
    return;
  }

  window.gtag("config", GA4_CONFIG.MEASUREMENT_ID, {
    custom_map: properties,
  });

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log("사용자 속성 설정:", properties);
  }
};

/**
 * 전환 이벤트 추적
 */
export const trackConversion = (
  eventName: string,
  parameters?: Record<string, unknown>,
) => {
  trackEvent(eventName, {
    ...parameters,
    event_category: "conversion",
  });
};

/**
 * 오류 추적
 */
export const trackError = (
  error: Error | string,
  context?: string,
  additionalInfo?: Record<string, unknown>,
) => {
  const errorMessage = typeof error === "string" ? error : error.message;

  trackEvent("error", {
    event_category: "error",
    event_label: errorMessage,
    description: context || "",
    ...additionalInfo,
  });
};

/**
 * 성능 추적
 */
export const trackPerformance = (
  metricName: string,
  value: number,
  unit?: string,
) => {
  trackEvent("performance", {
    event_category: "performance",
    event_label: metricName,
    value: value,
    unit: unit || "ms",
  });
};
