import { useCallback } from 'react';

interface KakaoLoginOptions {
  redirectUri?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface KakaoLoginReturn {
  handleKakaoLogin: () => void;
  logout: () => void;
}

export const useKakaoLogin = (
  options: KakaoLoginOptions = {},
): KakaoLoginReturn => {
  const {
    redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL,
    onSuccess,
    onError,
  } = options;

  const handleKakaoLogin = useCallback(() => {
    try {
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        console.error('Kakao SDK가 초기화되지 않았습니다.');
      }

      if (!redirectUri) {
        console.error('Redirect URI가 설정되지 않았습니다.');
      }

      window.Kakao.Auth.authorize({
        redirectUri: redirectUri as string,
      });

      onSuccess?.();
    } catch (error) {
      console.error('카카오 로그인 중 에러가 발생했습니다.', error);
    }
  }, [redirectUri, onSuccess, onError]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('accessToken');
      onSuccess?.();
    } catch (error) {
      console.error('카카오 로그아웃 중 에러가 발생했습니다.', error);
    }
  }, []);

  return {
    handleKakaoLogin,
    logout,
  };
};
