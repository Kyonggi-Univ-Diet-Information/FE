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
  const isKyongsul = foodCourt === FOOD_COURT.KYONGSUL;
  const [imageSrc, setImageSrc] = useState(
    isKyongsul
      ? `https://res.cloudinary.com/dm77jlwuj/image/upload/v1761492742/${menuId}.jpg`
      : '/images/no-image.png',
  );

  const handleError = () => {
    setImageSrc('/images/no-image.png');
  };

  return (
    <Image
      loading='lazy'
      placeholder='blur'
      blurDataURL='/images/no-image.png'
      src={imageSrc}
      alt={menuId.toString()}
      width={100}
      height={100}
      onError={handleError}
      className='rounded-xl object-cover'
    />
  );
}
