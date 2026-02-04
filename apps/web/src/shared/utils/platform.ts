export const isIos = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Mac|Apple/i.test(navigator.userAgent);
};
