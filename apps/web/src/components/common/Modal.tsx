import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <Link
        className='backdrop-blur-xs absolute inset-0 bg-black/30'
        href='/'
        replace
      />

      <div className='relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>
        <Link
          href='/'
          replace
          className='absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200'
        >
          ✕
        </Link>

        <div className='flex flex-col gap-4'>{children}</div>
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <p className='flex flex-col'>
      <span className='font-semibold'>{title}</span>
      {subtitle && <span className='text-sm text-gray-600'>{subtitle}</span>}
    </p>
  );
}

function ModalFooter({ children }: { children: ReactNode }) {
  return <div className='flex justify-end'>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
