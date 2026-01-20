<div align="center">

<img width="80" alt="logo" src="https://github.com/user-attachments/assets/5d7281c4-6c61-46e0-b98e-de14146f011c" />

<br/>
<br/>

![](https://img.shields.io/github/contributors/Kyonggi-Univ-Diet-Information/FE)
![](https://img.shields.io/github/last-commit/Kyonggi-Univ-Diet-Information/FE)
![](https://img.shields.io/github/license/Kyonggi-Univ-Diet-Information/FE)

<br/>

</div>

# Let's Eat Kiryong! · 기룡아 밥먹자!

기룡아 밥먹자! 는 경기대학교 학생들을 위한 교내 식당 정보 서비스예요.<br/>
학생들이 교내 식당의 메뉴와 실제 이용자들의 솔직한 리뷰를 바탕으로, 매 끼니마다 더 만족스러운 선택을 할 수 있도록 돕고 있어요.

## Key Features

> 다음과 같은 주요 기능을 제공하고 있어요.

| 소셜 로그인                                                                                                    | 메뉴 조회                                                                                                     | 리뷰 작성 및 조회                                                                                                | 인기 메뉴 / 최신 리뷰                                                                                             |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img width="200" src="https://github.com/user-attachments/assets/bfde9432-44f8-4d3f-8a5b-b080abaa4d2c" /> | <img width="200" src="https://github.com/user-attachments/assets/daf30872-e2b1-4868-8da7-8675caf732a9" /> | <img width="200" src="https://github.com/user-attachments/assets/5895182b-eaef-4ae0-bdd1-47a6d34b5b20" /> | <img width="200" alt="image" src="https://github.com/user-attachments/assets/7f5bed7d-4059-41c3-b7d8-2d614b5d5897" /> |

## History

> 기룡아 밥먹자! 서비스가 지금까지 어떻게 성장해왔는지 정리했어요.

### 서비스 첫 개발과 시작 (2024.10.20)
2024년 10월 20일, 기룡아 밥먹자! 서비스의 첫 버전을 만들고 서비스를 시작했어요.  
이때는 교내 식당 메뉴를 확인하고, 학생들이 직접 리뷰를 남길 수 있는 기본 기능을 중심으로 서비스를 구성했어요.

### 1차 리팩토링과 데이터 구조 개선
서비스를 운영하면서 구조를 한 번 정리할 필요가 생겨 1차 리팩토링을 진행했어요.  
`react-router-dom`의 `loader` 패턴을 적용해 라우트 단위로 데이터를 불러오도록 개선했고,  
`@tanstack/query`를 사용해 서버 상태 관리와 데이터 패칭 흐름을 더 안정적으로 다듬었어요.

### Next.js로의 마이그레이션
‘경슐랭 메뉴’ 기능을 추가하면서 서비스 구조를 다시 고민하게 됐어요.  
홈 화면과 식단 화면처럼 정적인 콘텐츠가 많은 특성을 살려,  
캐싱과 SEO에 강점이 있는 `Next.js`로 서비스 전체를 옮겼어요.

### Legacy 서비스 관리
마이그레이션 이전에 사용하던 웹 서비스는 모노레포 안의 `web-legacy` 프로젝트로 분리해 두었어요.  
필요할 때 이전 구현을 참고할 수 있도록 계속 관리하고 있어요.

### 지금, 그리고 앞으로
현재도 기룡아 밥먹자!는 더 나은 성능과 유지보수성, 그리고 사용하기 좋은 경험을 만들기 위해  
리팩토링과 기능 개선을 계속 이어가고 있어요.

## Project Structure

```
.
├── apps/
│   ├── web
│   ├── web-legacy (legacy version of web service)
│   └── land
└── packages/
    └── config
```

### `@kiryong/land`

기룡아 밥먹자! 서비스를 소개하기 위한 랜딩 페이지예요.  
웹 서비스가 애플리케이션 중심으로 전환되면서, 서비스의 목적과 주요 기능을 한눈에 전달하고  
모바일 애플리케이션 사용을 자연스럽게 안내하기 위해 만들어졌어요.

### `@kiryong/web`

기룡아 밥먹자!의 메인 웹 애플리케이션이에요.  
교내 식당 메뉴 조회, 리뷰 작성 및 열람 등 핵심 기능을 제공하며,  
현재 서비스 운영의 중심이 되는 프로젝트예요.

[`web` 프로젝트 구조 상세 보기](https://github.com/Kyonggi-Univ-Diet-Information/FE/blob/main/apps/web/README.md)

### `@kiryong/web-legacy`

기존에 운영되던 웹 서비스예요.  
아키텍처 개편과 기술 스택 전환 이후에도, 이전 구현을 참고하고 히스토리를 보존하기 위해  
모노레포 내에서 분리하여 관리하고 있어요.

### `@kiryong/mobile`

기룡아 밥먹자! 모바일 애플리케이션이에요.  
모바일 환경에 최적화된 사용자 경험을 제공하기 위해 개발 중이며,  
푸시 알림 등 앱 환경에서만 제공할 수 있는 기능을 중심으로 확장해 나가고 있어요.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).  
본 프로젝트는 GNU Affero General Public License v3.0(AGPL-3.0)을 따릅니다.

If you modify this software and run it as a network service, you must make the modified source code available to users of the service.  
본 소프트웨어를 수정하여 네트워크 서비스를 통해 제공하는 경우, 수정된 소스 코드를 서비스 이용자에게 공개해야 합니다.

See the [LICENSE](./LICENSE) file for details.  
자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

## Contributors

<a href = "https://github.com/Kyonggi-Univ-Diet-Information/FE/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=Kyonggi-Univ-Diet-Information/FE"/>
</a>
