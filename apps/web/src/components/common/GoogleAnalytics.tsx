'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA4_CONFIG, shouldTrackGA4 } from '@/lib/constants';

/**
 * Google Analytics 4 컴포넌트
 * - Next.js의 Script 컴포넌트를 사용하여 GA4 스크립트 로드
 * - 페이지 변경 시 자동으로 페이지뷰 추적
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 페이지 변경 추적
  useEffect(() => {
    if (!shouldTrackGA4()) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA4_CONFIG.MEASUREMENT_ID, {
        page_path: url,
      });

      if (GA4_CONFIG.DEBUG_MODE) {
        console.log('[GA4] Page view tracked:', url);
      }
    }
  }, [pathname, searchParams]);

  // GA4가 비활성화된 경우 아무것도 렌더링하지 않음
  if (!shouldTrackGA4()) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 스크립트 로드 */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.MEASUREMENT_ID}`}
      />

      {/* GA4 초기화 스크립트 */}
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_CONFIG.MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            ${GA4_CONFIG.DEBUG_MODE ? "console.log('[GA4] Initialized');" : ''}
          `,
        }}
      />
    </>
  );
}
