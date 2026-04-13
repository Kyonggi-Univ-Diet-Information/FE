import { bridge, createWebView } from '@webview-bridge/react-native';

import type { AppBridge } from '@kiryong/bridge';

import { performAppleLogin } from '@/api/performAppleLogin';
import { performKakaoLogin } from '@/api/performKakaoLogin';

/**
 * Web → Native 브릿지 구현
 * Web에서 bridge.socialLogin('kakao') 등으로 호출하면 이 메서드가 실행됩니다.
 */
export const appBridge = bridge<AppBridge>({
  async socialLogin(type) {
    try {
      if (type === 'kakao') {
        const { token } = await performKakaoLogin();
        return { success: true, accessToken: token };
      }

      if (type === 'apple') {
        const { token } = await performAppleLogin();
        return { success: true, accessToken: token };
      }

      return { success: false, message: '지원하지 않는 로그인 방식입니다.' };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : '로그인에 실패했습니다.',
      };
    }
  },
});

/**
 * 브릿지가 연결된 WebView 컴포넌트
 * app/index.tsx에서 react-native-webview 대신 이 WebView를 사용합니다.
 */
export const { WebView } = createWebView({
  bridge: appBridge,
  debug: __DEV__,
  fallback: method => {
    console.warn(`브릿지 메서드 '${method}'를 찾을 수 없습니다.`);
  },
});
