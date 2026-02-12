import {
  buildWebUrlFromPath,
  isExpoDevClientUrl,
  WEB_URL_PARAM_KEY,
} from './lib/webUrl';

export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): string {
  if (initial && path) {
    const webUrl = buildWebUrlFromPath(path);
    if (isExpoDevClientUrl(webUrl)) return '/';
    return `/?${WEB_URL_PARAM_KEY}=${encodeURIComponent(webUrl)}`;
  }
  if (initial) {
    return '/';
  }
  return '/';
}
