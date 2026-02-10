export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}) {
  // 앱이 처음 열릴 때만 리다이렉트 (initial = true)
  // path가 루트가 아니고, kiryong-app.vercel.app이 포함된 경우 (딥링크)
  if (initial && path && path !== '/') {
    // kiryong-app.vercel.app이 포함된 경로는 모두 루트로
    if (
      path.includes('kiryong-app.vercel.app') ||
      path.startsWith('/auth') ||
      path.startsWith('auth')
    ) {
      return '/';
    }
    // 다른 경로도 일단 루트로 (이 앱은 WebView만 있음)
    return '/';
  }
  return path;
}
