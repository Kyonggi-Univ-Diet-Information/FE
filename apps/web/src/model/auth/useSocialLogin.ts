import { useRouter } from 'next/navigation';
import { mutate } from 'swr';

import { fetchAppleLoginUrl } from '@/api/auth/fetchAppleLoginUrl';

import { isAndroid, isWebView, setLoginState } from '@/model/common';
import { authKeys } from '@/model/common/queryKey';

import { setAuthCookies } from './setAuthCookies';
import { useKakaoLogin } from './useKakaoLogin';
import { bridge } from './useNativeSocialLogin';

interface SocialLoginParams {
  provider: 'kakao' | 'apple' | 'google';
}

export const useSocialLogin = (params: SocialLoginParams) => {
  const { provider } = params;
  const router = useRouter();

  const handleAppleLogin = async () => {
    const { url } = await fetchAppleLoginUrl();
    return (window.location.href = url);
  };

  const handleKakaoLogin = () => {
    if (isAndroid()) {
      handleKakaoLoginAndroid();
    } else {
      handleKakaoLoginIos();
    }
  };

  const { handleKakaoLogin: handleKakaoLoginIos } = useKakaoLogin({
    onSuccess: () => {},
    onError: loginError => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const handleKakaoLoginAndroid = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&state=${setLoginState('kakao')}`;
  };

  const handleGoogleLogin = async () => {
    const href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${setLoginState('google')}`;
    window.location.href = href;
  };

  /**
   * WebView 환경에서 네이티브 브릿지를 통해 소셜 로그인을 수행합니다.
   * 네이티브 앱이 SDK 로그인 + 백엔드 API 호출을 완료하고 JWT를 반환합니다.
   */
  const handleNativeLogin = async () => {
    const result = await bridge.socialLogin(provider);

    if (!result.success) {
      console.error(`네이티브 로그인 실패: ${result.message}`);
      return;
    }

    await setAuthCookies({ accessToken: result.accessToken });
    await mutate(authKeys.status());
    router.replace('/');
  };

  const login = async () => {
    if (isWebView()) {
      return handleNativeLogin();
    }

    if (provider === 'kakao') return handleKakaoLogin();
    if (provider === 'apple') return handleAppleLogin();
    if (provider === 'google') return handleGoogleLogin();
  };

  return { login };
};
