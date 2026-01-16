// import { useRouter } from 'next/navigation';

import { useKakaoLogin } from './useKakaoLogin';
import { fetchAppleLoginUrl } from '../api/fetchAppleLoginUrl';

interface SocialLoginParams {
  provider: 'kakao' | 'apple' | 'google';
}

export default function useSocialLogin(params: SocialLoginParams) {
  const { provider } = params;
  // const router = useRouter();

  const handleAppleLogin = async () => {
    const { url } = await fetchAppleLoginUrl();
    return (window.location.href = url);
  };

  const { handleKakaoLogin } = useKakaoLogin({
    onSuccess: () => {
      // router.push('/loading');
    },
    onError: loginError => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const handleGoogleLogin = async () => {
    alert('google login');
  };

  const login = async () => {
    if (provider === 'kakao') {
      return handleKakaoLogin();
    }
    if (provider === 'apple') {
      return handleAppleLogin();
    }
    if (provider === 'google') {
      return handleGoogleLogin();
    }
  };

  return { login };
}
