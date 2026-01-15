export default function Home() {
  const INQUIRY_URL = 'https://pf.kakao.com/_RxhPZG';

  return (
    <main class='flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-gray-700'>
      <div class='mb-8 text-6xl'>🍽️</div>
      <h1 class='mb-4 text-2xl font-bold text-gray-900'>
        잠시 쉬어가는 중이에요
      </h1>
      <p class='mb-2 text-gray-500'>방학 기간 동안 서비스 점검 중입니다.</p>
      <p class='text-gray-500'>새학기와 함께 더 나은 모습으로 돌아올게요!</p>
      <div class='mt-8 rounded-2xl border border-gray-100 bg-gray-50 px-8 py-6'>
        <p class='text-sm text-gray-400'>
          문의사항이 있으시면 아래로 연락해주세요
        </p>
        <p class='mt-2 font-medium text-orange-500 underline underline-offset-4'>
          <a href={INQUIRY_URL} target='_blank' rel='noopener noreferrer'>
            {INQUIRY_URL}
          </a>
        </p>
      </div>
    </main>
  );
}
