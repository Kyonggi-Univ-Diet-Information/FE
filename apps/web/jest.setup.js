// jest-dom의 커스텀 매처들을 추가
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// Node.js API를 전역으로 추가 (Next.js 15 호환)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Next.js의 이미지 최적화 모킹
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Next.js navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Next.js cache 모킹 (서버 액션 테스트용)
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
  revalidatePath: jest.fn(),
  unstable_cache: jest.fn(fn => fn),
}));

// 환경 변수 설정
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api';

// 전역 fetch 모킹 (필요한 경우)
global.fetch = jest.fn();

// 각 테스트 전에 모든 모킹 초기화
beforeEach(() => {
  jest.clearAllMocks();
});
