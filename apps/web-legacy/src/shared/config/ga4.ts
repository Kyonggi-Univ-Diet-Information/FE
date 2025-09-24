export const GA4_CONFIG = {
  MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID,
  DISABLE_IN_DEV: true,
  DEBUG_MODE: false,
} as const;

export const isDevelopment = import.meta.env.DEV;

export const shouldTrackGA4 = () => {
  if (
    !GA4_CONFIG.MEASUREMENT_ID ||
    GA4_CONFIG.MEASUREMENT_ID === "G-XXXXXXXXXX"
  ) {
    console.warn(
      "GA4 측정 ID가 설정되지 않았습니다. GA4_CONFIG.MEASUREMENT_ID를 설정하세요.",
    );
    return false;
  }

  if (isDevelopment && GA4_CONFIG.DISABLE_IN_DEV) {
    console.log("개발 환경에서 GA4 추적이 비활성화되었습니다.");
    return false;
  }

  return true;
};
