const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.js 앱의 경로를 제공하여 next.config.js 및 .env 파일을 로드
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // 테스트 환경 설정
  testEnvironment: 'jest-environment-jsdom',

  // Setup 파일들
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // 모듈 경로 매핑 (tsconfig.json의 paths와 동일하게)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // 테스트 파일 패턴
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // 커버리지 수집 대상
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],

  // 변환 무시할 패턴
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  // 커버리지 임계값 (선택사항)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

// next/jest가 비동기 Next.js 설정을 로드할 수 있도록 내보내기
module.exports = createJestConfig(customJestConfig);
