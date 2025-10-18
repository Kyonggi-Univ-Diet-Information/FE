### File-Structure of `Web` project

```
.
├── app (next.js app router files)/
│   ├── _analytics
│   ├── _layout (Header, BottomNavBar)
│   ├── _providers
│   └── _styles
├── entities (important datas e.g. review, menu)/
│   ├── campus-menu
│   ├── campus-review
│   ├── dorm-menu
│   └── dorm-review (deprecated)
├── features/
│   ├── auth
│   └── review (review-post, review-like)
├── page/
│   ├── campus
│   ├── dorm
│   ├── home
│   └── review
├── shared/
│   ├── api (next.js fetch wrapper methods)
│   ├── axios
│   ├── config
│   ├── ga4
│   ├── i18n
│   ├── lib
│   ├── ui
│   └── utils (e.g. cn util)
└── widgets (reused ui block)/
    └── review/
        └── ui/
            └── ReviewItem.tsx
```

`web` 프로젝트는 [FSD](https://feature-sliced.design/kr)를 가능한 한 엄격하게 지키고자 합니다.
