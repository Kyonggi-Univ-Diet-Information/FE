import type { AppBridge } from '@kiryong/bridge';
import { linkBridge, type BridgeStore } from '@webview-bridge/web';

/**
 * @webview-bridge/web를 통해 Native 브릿지에 연결합니다.
 * React Native WebView 환경에서 bridge.socialLogin('kakao') 등을 호출하면
 * 네이티브 앱의 appBridge 메서드가 실행됩니다.
 */
export const bridge = linkBridge<BridgeStore<AppBridge>>({
  throwOnError: false,
  timeout: 30_000,
  initialBridge: {},
});
