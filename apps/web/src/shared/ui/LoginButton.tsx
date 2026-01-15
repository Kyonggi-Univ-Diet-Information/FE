import Image from 'next/image';

import { Button } from './Button';
import { cn } from '../utils';

interface LoginButtonProps {
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
  className: string;
  iconClassName?: string;
  iconSize?: { width: number; height: number };
}

export default function LoginButton({
  iconSrc,
  iconAlt,
  children,
  className,
  iconClassName,
  iconSize = { width: 22, height: 22 },
}: LoginButtonProps) {
  return (
    <Button
      className={cn(
        'h-14 w-full rounded-2xl border-none text-base font-semibold transition-all active:scale-[0.98]',
        className,
      )}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={iconSize.width}
        height={iconSize.height}
        className={iconClassName}
      />
      {children}
    </Button>
  );
}
