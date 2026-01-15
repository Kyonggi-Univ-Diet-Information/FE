import { A } from '@solidjs/router';

export default function NotFound() {
  return (
    <main class='flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-gray-700'>
      <div class='mb-8 text-6xl'>🍽️</div>
      <h1 class='mb-4 text-2xl font-bold text-gray-900'>잘못된 접근이에요!</h1>
      <p class='mb-6 text-gray-500'>잘못된 접근이에요! 홈으로 돌아가세요.</p>
      <A href='/' class='text-orange-500 hover:underline'>
        홈으로 돌아가기
      </A>
    </main>
  );
}
