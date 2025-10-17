# Google Analytics 4 (GA4) 설정 가이드

이 문서는 "기룡아 밥먹자" 프로젝트에 Google Analytics 4가 적용된 방법과 설정 방법을 설명합니다.

## 📋 목차

1. [적용된 구조](#적용된-구조)
2. [환경 변수 설정](#환경-변수-설정)
3. [추적되는 이벤트](#추적되는-이벤트)
4. [사용 방법](#사용-방법)
5. [개발 환경 설정](#개발-환경-설정)
6. [문제 해결](#문제-해결)

## 🏗️ 적용된 구조

### 파일 구조

```
apps/web/src/
├── lib/
│   ├── constants/
│   │   └── ga4.ts          # GA4 설정 및 환경 변수
│   └── utils/
│       └── ga4.ts          # GA4 이벤트 추적 유틸리티 함수
├── types/
│   └── ga4.ts              # GA4 타입 정의
└── components/
    └── common/
        └── GoogleAnalytics.tsx  # GA4 컴포넌트 (Next.js Script 사용)
```

### 주요 기능

1. **Next.js Script 컴포넌트 사용**: `next/script`를 사용하여 최적화된 방식으로 GA4 스크립트 로드
2. **자동 페이지뷰 추적**: 페이지 전환 시 자동으로 추적
3. **타입 안전성**: TypeScript로 완전한 타입 정의
4. **환경별 설정**: 개발/프로덕션 환경에 따른 자동 설정
5. **디버그 모드**: 개발 시 이벤트 추적 확인 가능

## 🔧 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Google Analytics 4 설정
# GA4 측정 ID (G-XXXXXXXXXX 형식)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-NKEL4R473V

# GA4 디버그 모드 (개발 시 true로 설정하면 콘솔에서 이벤트 확인 가능)
NEXT_PUBLIC_GA_DEBUG=false
```

### 환경 변수 설명

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 측정 ID (필수)
  - Google Analytics에서 발급받은 측정 ID
  - 형식: `G-XXXXXXXXXX`
  - 기본값: `G-NKEL4R473V`

- `NEXT_PUBLIC_GA_DEBUG`: 디버그 모드 (선택)
  - `true`: 콘솔에 추적 이벤트 로그 출력
  - `false`: 로그 출력 안 함 (기본값)

### 자동 설정

- **개발 환경**: GA4 추적이 자동으로 비활성화됩니다
- **프로덕션 환경**: GA4 추적이 자동으로 활성화됩니다

## 📊 추적되는 이벤트

### 자동 추적

- ✅ **페이지뷰**: 모든 라우트 변경 시 자동 추적

### 수동 추적 가능한 이벤트

#### 1. 메뉴 관련 이벤트

```typescript
import { trackMenuClick } from '@/shared/lib/ga4';

trackMenuClick({
  menu_id: '12345',
  menu_name: '불고기 덮밥',
  time_slot: 'LUNCH',
  is_mobile: true,
  selected_date: '2025-10-13',
});
```

#### 2. 리뷰 관련 이벤트

```typescript
import {
  trackRatingSelect,
  trackReviewSubmitSuccess,
  trackReviewLike,
  trackReviewUnlike,
} from '@/shared/lib/ga4';

// 평점 선택
trackRatingSelect({
  rating: 5,
  menu_id: '12345',
  language: 'ko',
});

// 리뷰 작성 성공 (전환 이벤트)
trackReviewSubmitSuccess({
  menu_id: '12345',
  rating: 5,
  content_length: 100,
  language: 'ko',
});

// 리뷰 좋아요
trackReviewLike({
  review_id: '67890',
  review_rating: 5,
  content_length: 100,
});

// 리뷰 좋아요 취소
trackReviewUnlike({
  review_id: '67890',
  review_rating: 5,
});
```

#### 3. 에러 추적

```typescript
import { trackError, trackReviewSubmitError } from '@/shared/lib/ga4';

// 일반 에러
trackError({
  error_message: 'API 요청 실패',
  error_type: 'NetworkError',
  page: '/review',
});

// 리뷰 제출 에러
trackReviewSubmitError({
  error_message: '리뷰 제출 실패',
});
```

#### 4. 커스텀 이벤트

```typescript
import { trackEvent, trackConversion } from '@/shared/lib/ga4';

// 일반 이벤트
trackEvent('custom_event', {
  event_category: 'engagement',
  event_label: 'button_click',
  value: 1,
});

// 전환 이벤트 (중요한 사용자 행동)
trackConversion('signup_complete', {
  user_id: '12345',
  signup_method: 'email',
});
```

## 💻 사용 방법

### 기본 사용법

GA4는 자동으로 초기화되고 페이지뷰를 추적합니다. 추가 작업이 필요 없습니다.

### 컴포넌트에서 이벤트 추적

```typescript
'use client';

import { trackMenuClick } from '@/shared/lib/ga4';

export default function MenuCard({ menu }) {
  const handleMenuClick = () => {
    // GA4 이벤트 추적
    trackMenuClick({
      menu_id: menu.id,
      menu_name: menu.name,
      time_slot: 'LUNCH',
      is_mobile: window.innerWidth < 768,
      selected_date: new Date().toISOString().split('T')[0],
    });

    // 다른 로직...
  };

  return (
    <div onClick={handleMenuClick}>
      {menu.name}
    </div>
  );
}
```

## 🛠 개발 환경 설정

### 개발 중 GA4 추적 확인

1. `.env.local` 파일에서 디버그 모드 활성화:

   ```bash
   NEXT_PUBLIC_GA_DEBUG=true
   ```

2. 개발 서버 재시작:

   ```bash
   pnpm dev
   ```

3. 브라우저 콘솔에서 이벤트 로그 확인:
   ```
   [GA4] Initialized
   [GA4] Page view tracked: /
   [GA4] Event tracked: menu_click { menu_id: '12345', ... }
   ```

### 프로덕션 환경에서 확인

1. Google Analytics에 로그인
2. 실시간 보고서 확인
3. 이벤트 탭에서 추적되는 이벤트 확인

## 🚨 문제 해결

### 1. GA4가 추적하지 않는 경우

**확인 사항:**

- ✅ 환경 변수가 올바르게 설정되었는지 확인
- ✅ 프로덕션 빌드인지 확인 (개발 환경에서는 기본적으로 비활성화)
- ✅ 브라우저 개발자 도구 > 네트워크 탭에서 `gtag/js` 요청 확인
- ✅ 광고 차단 프로그램이 비활성화되었는지 확인

**해결 방법:**

```typescript
// src/lib/constants/ga4.ts에서 확인
export const shouldTrackGA4 = (): boolean => {
  // 이 함수가 true를 반환하는지 확인
  console.log('GA4 Tracking:', shouldTrackGA4());
};
```

### 2. 개발 환경에서 추적하고 싶은 경우

`src/lib/constants/ga4.ts` 파일 수정:

```typescript
export const GA4_CONFIG = {
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-NKEL4R473V',
  DISABLE_IN_DEV: false, // true → false로 변경
  DEBUG_MODE: true, // 디버그 모드 활성화
} as const;
```

### 3. 이벤트가 Google Analytics에 나타나지 않는 경우

**원인:**

- GA4는 실시간 데이터까지 최대 24-48시간이 걸릴 수 있습니다
- 실시간 보고서에서는 즉시 확인 가능합니다

**확인 방법:**

1. Google Analytics → 실시간 보고서
2. 이벤트 탭에서 실시간 이벤트 확인
3. 디버그 모드를 활성화하여 브라우저 콘솔에서 이벤트 전송 확인

### 4. TypeScript 에러가 발생하는 경우

**에러:**

```
Property 'gtag' does not exist on type 'Window'
```

**해결:**
`src/types/ga4.ts` 파일에 이미 타입 정의가 포함되어 있습니다. 만약 에러가 발생한다면:

```typescript
// tsconfig.json에 types 추가
{
  "compilerOptions": {
    "types": ["@/types/ga4"]
  }
}
```

## 📚 추가 리소스

- [Google Analytics 4 공식 문서](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js 참조](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [Next.js Script 최적화](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [GA4 이벤트 참조](https://developers.google.com/analytics/devguides/collection/ga4/events)

## ✅ 체크리스트

- [ ] `.env.local` 파일에 환경 변수 설정
- [ ] GA4 측정 ID 확인
- [ ] 프로덕션 환경에서 페이지뷰 추적 확인
- [ ] 필요한 곳에 커스텀 이벤트 추적 추가
- [ ] Google Analytics에서 실시간 데이터 확인

## 🔄 업데이트 내역

- **2025-10-13**: Next.js 기반 GA4 연동 완료
  - Next.js Script 컴포넌트 사용
  - 자동 페이지뷰 추적
  - 타입 안전성 보장
  - 환경별 자동 설정
  - 이벤트 추적 유틸리티 함수
  - 디버그 모드 지원
