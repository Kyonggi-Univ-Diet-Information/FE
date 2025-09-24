# Google Analytics 4 (GA4) 연동 가이드

이 문서는 "기룡아 밥먹자" 프로젝트에 Google Analytics 4가 연동된 방법과 설정 방법을 설명합니다.

## 📋 목차

1. [설치된 패키지](#설치된-패키지)
2. [GA4 측정 ID 설정](#ga4-측정-id-설정)
3. [추적되는 이벤트](#추적되는-이벤트)
4. [개발 환경 설정](#개발-환경-설정)
5. [사용법](#사용법)
6. [문제 해결](#문제-해결)

## 📦 설치된 패키지

```bash
pnpm add gtag react-ga4
```

- `gtag`: Google Analytics gtag 라이브러리
- `react-ga4`: React용 GA4 라이브러리

## 🔧 GA4 측정 ID 설정

### 1. Google Analytics에서 GA4 속성 생성

1. [Google Analytics](https://analytics.google.com/)에 접속
2. 새 속성 생성 또는 기존 속성 선택
3. 데이터 스트림 → 웹 → URL 입력
4. 측정 ID 복사 (G-XXXXXXXXXX 형식)

### 2. 측정 ID 설정

`src/shared/config/ga4.ts` 파일에서 측정 ID를 설정하세요:

```typescript
export const GA4_CONFIG = {
  // 실제 측정 ID로 교체하세요
  MEASUREMENT_ID: "G-XXXXXXXXXX",

  // 개발 환경에서 추적 비활성화 여부
  DISABLE_IN_DEV: true,

  // 디버그 모드 활성화 여부
  DEBUG_MODE: false,
} as const;
```

### 3. HTML 파일 설정

`index.html` 파일에서도 측정 ID를 업데이트하세요:

```html
<!-- Google Analytics 4 -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX", {
    page_title: document.title,
    page_location: window.location.href,
  });
</script>
```

## 📊 추적되는 이벤트

### 자동 추적 이벤트

- **페이지 뷰**: 모든 라우트 변경 시 자동 추적
- **앱 초기화**: 앱 시작 시 GA4 초기화

### 수동 추적 이벤트

#### 메뉴 관련

- `menu_click`: 메뉴 항목 클릭
  - `menu_id`: 메뉴 ID
  - `menu_name`: 메뉴 이름
  - `time_slot`: 시간대 (BREAKFAST, LUNCH, DINNER)
  - `is_mobile`: 모바일 여부
  - `selected_date`: 선택된 날짜

#### 리뷰 관련

- `rating_select`: 평점 선택
  - `rating`: 선택된 평점 (1-5)
  - `menu_id`: 메뉴 ID
  - `language`: 언어 설정

- `review_submit_success`: 리뷰 작성 성공 (전환 이벤트)
  - `menu_id`: 메뉴 ID
  - `rating`: 평점
  - `content_length`: 리뷰 내용 길이
  - `language`: 언어 설정

- `review_submit_error`: 리뷰 작성 실패
  - `error_message`: 에러 메시지

- `review_like`: 리뷰 좋아요 추가
  - `review_id`: 리뷰 ID
  - `review_rating`: 리뷰 평점
  - `content_length`: 리뷰 내용 길이

- `review_unlike`: 리뷰 좋아요 취소
  - `review_id`: 리뷰 ID
  - `review_rating`: 리뷰 평점

#### 에러 추적

- `error`: 일반적인 에러
- `review_like_error`: 좋아요 추가/삭제 실패
- `review_submit_error`: 리뷰 제출 실패

## 🛠 개발 환경 설정

### 개발 환경에서 추적 비활성화

개발 중에는 GA4 추적을 비활성화할 수 있습니다:

```typescript
// src/shared/config/ga4.ts
export const GA4_CONFIG = {
  MEASUREMENT_ID: "G-XXXXXXXXXX",
  DISABLE_IN_DEV: true, // 개발 환경에서 추적 비활성화
  DEBUG_MODE: false,
} as const;
```

### 디버그 모드 활성화

디버그 모드를 활성화하면 콘솔에서 추적되는 이벤트를 확인할 수 있습니다:

```typescript
export const GA4_CONFIG = {
  MEASUREMENT_ID: "G-XXXXXXXXXX",
  DISABLE_IN_DEV: false,
  DEBUG_MODE: true, // 디버그 모드 활성화
} as const;
```

## 💻 사용법

### 기본 사용법

GA4는 자동으로 초기화되고 페이지 뷰를 추적합니다. 추가 이벤트 추적이 필요한 경우:

```typescript
import { trackEvent, trackConversion } from "~/shared/utils/ga4";

// 일반 이벤트 추적
trackEvent("custom_event", {
  event_category: "engagement",
  event_label: "button_click",
  value: 1,
});

// 전환 이벤트 추적
trackConversion("purchase", {
  transaction_id: "12345",
  value: 29.99,
  currency: "KRW",
});
```

### 커스텀 훅 사용

```typescript
import { useGA4Event } from '~/shared/hooks/useGA4';

const MyComponent = () => {
  const { trackEvent, trackError } = useGA4Event();

  const handleClick = () => {
    trackEvent('button_click', {
      button_name: 'submit',
      page: 'home'
    });
  };

  return <button onClick={handleClick}>클릭</button>;
};
```

## 🚨 문제 해결

### 1. GA4가 추적하지 않는 경우

1. 측정 ID가 올바르게 설정되었는지 확인
2. 브라우저 개발자 도구에서 네트워크 탭 확인
3. `shouldTrackGA4()` 함수가 `true`를 반환하는지 확인

### 2. 개발 환경에서 추적이 되는 경우

`DISABLE_IN_DEV` 설정을 `true`로 변경하세요.

### 3. 이벤트가 Google Analytics에 나타나지 않는 경우

- GA4에서는 실시간 데이터까지 24-48시간이 걸릴 수 있습니다
- 디버그 모드를 활성화하여 이벤트가 올바르게 전송되는지 확인
- Google Analytics의 실시간 보고서에서 확인

### 4. 타입 에러가 발생하는 경우

```typescript
// window.gtag 타입 정의가 필요할 수 있습니다
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
```

## 📚 추가 리소스

- [Google Analytics 4 공식 문서](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js 참조](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [GA4 이벤트 참조](https://developers.google.com/analytics/devguides/collection/ga4/events)

## 🔄 업데이트 내역

- **2024-01-XX**: 초기 GA4 연동 완료
  - 기본 페이지 뷰 추적
  - 메뉴 클릭 이벤트 추적
  - 리뷰 작성 및 좋아요 이벤트 추적
  - 에러 추적
  - 개발 환경 설정 옵션
