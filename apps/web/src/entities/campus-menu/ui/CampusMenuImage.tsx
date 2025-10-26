'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CampusMenuImageProps {
  menuId: number;
}

export default function CampusMenuImage({ menuId }: CampusMenuImageProps) {
  const [imageSrc, setImageSrc] = useState(
    `https://res.cloudinary.com/dm77jlwuj/image/upload/v1761488524/130_ymlcvs.webp`,
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
