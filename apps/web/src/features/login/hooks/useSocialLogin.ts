import { setLoginState } from '@/shared/utils';

import { useKakaoLogin } from './useKakaoLogin';
import { fetchAppleLoginUrl } from '../api/fetchAppleLoginUrl';

interface SocialLoginParams {
  provider: 'kakao' | 'apple' | 'google';
}

export const useSocialLogin = (params: SocialLoginParams) => {
  const { provider } = params;

  const handleAppleLogin = async () => {
    const loginState = setLoginState('apple');
    const { url } = await fetchAppleLoginUrl({ loginState });
    return (window.location.href = url);
  };

  const { handleKakaoLogin } = useKakaoLogin({
    onSuccess: () => {},
    onError: loginError => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const handleGoogleLogin = async () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${setLoginState('google')}`;
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
};
