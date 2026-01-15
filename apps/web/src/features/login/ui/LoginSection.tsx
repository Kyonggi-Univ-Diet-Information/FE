import { LoginButton } from '@/shared/ui';
import { isIos } from '@/shared/utils';

export default function LoginSection() {
  return (
    <div className='flex flex-col gap-3.5'>
      <KakaoLoginButton />
      <AppleLoginButton />
      <GoogleLoginButton />
    </div>
  );
}

function KakaoLoginButton() {
  return (
    <LoginButton
      iconSrc='/icons/icon-kakao.svg'
      iconAlt='kakao'
      className='bg-[#FEE500] text-[#191919]'
      iconClassName='mr-2'
    >
      카카오로 시작하기
    </LoginButton>
  );
}

function AppleLoginButton() {
  if (!isIos()) return null;

  return (
    <LoginButton
      iconSrc='/icons/icon-apple.svg'
      iconAlt='apple'
      className='bg-black text-white'
      iconClassName='mt-[3px] scale-150'
      iconSize={{ width: 40, height: 40 }}
    >
      Apple로 시작하기
    </LoginButton>
  );
}

function GoogleLoginButton() {
  if (isIos()) return null;

  return (
    <LoginButton
      iconSrc='/icons/icon-google.svg'
      iconAlt='google'
      className='bg-black text-white'
      iconClassName='mr-2'
    >
      Google로 시작하기
    </LoginButton>
  );
}
