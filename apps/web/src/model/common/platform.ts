export const isIos = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
};

export const isAndroid = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

export const isWebView = () => {
  if (typeof window === 'undefined') return false;
  return !!window.ReactNativeWebView || !!window.IS_REACT_NATIVE_WEBVIEW;
};
