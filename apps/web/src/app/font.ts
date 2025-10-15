import localFont from 'next/font/local';

export const wantedSans = localFont({
  src: [
    {
      path: '../../public/fonts/WantedSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-wantedSans',
  display: 'swap',
  preload: true,
});

export const brBold = localFont({
  src: '../../public/fonts/brBold.otf',
  weight: '700',
  style: 'normal',
  variable: '--font-brBold',
  display: 'swap',
  preload: true,
});

export const brRegular = localFont({
  src: '../../public/fonts/brRegular.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-brRegular',
  display: 'swap',
  preload: true,
});

export const tossFace = localFont({
  src: '../../public/fonts/tossFace.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-tossFace',
  display: 'swap',
  preload: false,
});
