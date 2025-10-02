'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <div className='flex min-h-screen max-w-[770px] flex-col items-center justify-center p-8'>
      <h2 className='mb-4 text-2xl font-bold text-red-600'>
        예상치 못한 오류가 발생했습니다
      </h2>
      <p className='mb-6 text-center text-gray-600'>
        죄송합니다. 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>

      <details className='mb-6 w-full max-w-2xl'>
        <summary className='mb-2 cursor-pointer text-sm font-medium text-gray-700'>
          에러 세부사항 보기
        </summary>
        <div className='rounded-lg bg-gray-100 p-4'>
          <pre className='overflow-auto whitespace-pre-wrap text-xs text-gray-600'>
            {error.message}
            {error.stack && `\n\nStack trace:\n${error.stack}`}
          </pre>
        </div>
      </details>

      <div className='flex gap-4'>
        <button
          onClick={reset}
          className='rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600'
        >
          다시 시도
        </button>
        <button
          onClick={() => (window.location.href = '/')}
          className='rounded-lg bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600'
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
