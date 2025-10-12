import localFont from 'next/font/local';

export const wantedSans = localFont({
  src: [
    {
      path: '../../public/fonts/WantedSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-Medium.ttf',
      weight: '500',
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
    {
      path: '../../public/fonts/WantedSans-Black.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-wantedSans',
});

export const brBold = localFont({
  src: '../../public/fonts/brBold.otf',
  weight: '700',
  style: 'normal',
  variable: '--font-brBold',
});

export const brRegular = localFont({
  src: '../../public/fonts/brRegular.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-brRegular',
});

export const tossFace = localFont({
  src: '../../public/fonts/tossFace.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-tossFace',
});
