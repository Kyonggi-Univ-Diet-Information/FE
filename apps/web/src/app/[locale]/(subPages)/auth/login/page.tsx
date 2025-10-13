import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/common';
import { Title } from '@/components/layout';

export default function LoginPage() {
  const kakaoRestApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}`;

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='max-w-120 min-h-50 flex w-4/5 min-w-80 flex-col justify-between rounded-2xl border border-gray-100 bg-gray-100/50 p-4 py-6'>
        <div className='flex flex-col gap-y-1'>
          <Title>
            <span className='text-point font-brBold'>기룡아 밥먹자</span>에서
            <br />
            인증을 요청했어요
          </Title>
          <p className='text-sm text-gray-600'>
            카카오 로그인 후 리뷰 기능을 이용해보세요!
          </p>
        </div>
        <Link href={kakaoLoginUrl}>
          <Button variant='kakao' size='lg' className='w-full'>
            <Image
              src='/icons/icon-kakao.svg'
              alt='kakao'
              width={20}
              height={20}
            />
            카카오 로그인
          </Button>
        </Link>
      </div>
    </div>
  );
}
