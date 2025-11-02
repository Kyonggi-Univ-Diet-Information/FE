'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState, type ReactNode } from 'react';

export default function CarouselWrapper({ children }: { children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    setTotalItems(emblaApi.slideNodes().length);
    setCurrentIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <section className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>{children}</div>
      </section>
      <CarouselIndicator currentIndex={currentIndex} totalItems={totalItems} />
    </>
  );
}

function CarouselIndicator({
  currentIndex,
  totalItems,
}: {
  currentIndex: number;
  totalItems: number;
}) {
  return (
    <div className='top-42 absolute left-1/2 flex -translate-x-1/2 justify-center gap-1.5'>
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          className={`h-1.5 w-1.5 cursor-pointer rounded-full focus:outline-none ${index === currentIndex ? 'bg-point w-6' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  );
}
