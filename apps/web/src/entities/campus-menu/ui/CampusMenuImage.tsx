'use client';

import Image from 'next/image';
import { useState } from 'react';

import { FOOD_COURT, type FoodCourt } from '@/shared/config';

interface CampusMenuImageProps {
  menuId: number;
  foodCourt: FoodCourt;
}

export default function CampusMenuImage({
  foodCourt,
  menuId,
}: CampusMenuImageProps) {
  const imageKey: Record<FoodCourt, string> = {
    [FOOD_COURT.KYONGSUL]: '',
    [FOOD_COURT.DORMITORY]: 'do_',
    [FOOD_COURT.E_SQUARE]: 'es_',
    [FOOD_COURT.SALLY_BOX]: 'sb_',
  };

  const [imageFormat, setImageFormat] = useState<'jpg' | 'png' | 'fallback'>(
    'jpg',
  );

  const imageSrc =
    imageFormat === 'fallback'
      ? '/images/no-image.png'
      : `https://res.cloudinary.com/dm77jlwuj/image/upload/v1761492742/${imageKey[foodCourt]}${menuId}.${imageFormat}`;

  const handleError = () => {
    if (imageFormat === 'jpg') {
      setImageFormat('png');
    } else if (imageFormat === 'png') {
      setImageFormat('fallback');
    }
  };

  return (
    <div className='relative size-[100px] overflow-hidden rounded-xl'>
      <Image
        loading='lazy'
        placeholder='blur'
        blurDataURL='/images/no-image.png'
        src={imageSrc}
        alt={menuId.toString()}
        fill
        onError={handleError}
        className='absolute inset-0 size-full object-cover'
      />
    </div>
  );
}
