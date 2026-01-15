import { fetchAppleLoginUrl } from '../api/fetchAppleLoginUrl';

interface SocialLoginParams {
  provider: 'kakao' | 'apple' | 'google';
}

export default function useSocialLogin(params: SocialLoginParams) {
  const { provider } = params;

  const handleAppleLogin = async () => {
    const { url } = await fetchAppleLoginUrl();
    return (window.location.href = url);
  };

  const handleKakaoLogin = async () => {
    alert('kakao login');
  };

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
