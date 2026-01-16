import { useCallback } from 'react';

import { setLoginState } from '@/shared/utils';

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
        const error = new Error('Kakao SDK가 초기화되지 않았습니다.');
        console.error(error.message);
        onError?.(error);
        return;
      }

      if (!redirectUri) {
        const error = new Error('Redirect URI가 설정되지 않았습니다.');
        console.error(error.message);
        onError?.(error);
        return;
      }

      window.Kakao.Auth.authorize({
        redirectUri: redirectUri as string,
        state: setLoginState('kakao'),
      });

      onSuccess?.();
    } catch (error) {
      const errorMessage = '카카오 로그인 중 에러가 발생했습니다.';
      console.error(errorMessage, error);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [redirectUri, onSuccess, onError]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('accessToken');
      onSuccess?.();
    } catch (error) {
      console.error('카카오 로그아웃 중 에러가 발생했습니다.', error);
    }
  }, [onSuccess]);

  return {
    handleKakaoLogin,
    logout,
  };
};
