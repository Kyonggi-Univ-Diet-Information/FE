/**
 * 딥링크로 앱이 열릴 때 Expo Router가 경로를 앱 라우트로 해석하지 않도록
 * 모든 인텐트를 index(/)로 리다이렉트합니다.
 * 실제 웹 경로는 index의 WebView에서 Linking.getInitialURL()로 받아 처리합니다.
 */
export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): string {
  if (initial) {
    return '/';
  }
  return path;
}
