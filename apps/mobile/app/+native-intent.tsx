import { buildWebUrlFromPath, WEB_URL_PARAM_KEY } from './lib/webUrl';

/**
 * 딥링크로 앱이 열릴 때 Expo Router가 경로를 앱 라우트로 해석하지 않도록
 * 모든 인텐트를 index(/)로 리다이렉트하고, 변환한 웹 URL을 쿼리(__webUrl)로 전달
 * index.tsx WebView는 이 __webUrl을 우선 사용
 */
export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): string {
  if (initial && path) {
    const webUrl = buildWebUrlFromPath(path);
    return `/?${WEB_URL_PARAM_KEY}=${encodeURIComponent(webUrl)}`;
  }
  if (initial) {
    return '/';
  }
  return '/';
}
