import Link from 'next/link';

import { POLICY_URL } from '@/shared/config';

export default function EntryPolicySection() {
  return (
    <p className='mt-10 text-center text-[11px] leading-relaxed text-gray-400'>
      시작 시{' '}
      <Link
        href={POLICY_URL.TERMS_OF_SERVICE}
        target='_blank'
        className='underline underline-offset-4'
      >
        이용약관
      </Link>{' '}
      및{' '}
      <Link
        href={POLICY_URL.PRIVACY_POLICY}
        target='_blank'
        className='underline underline-offset-4'
      >
        개인정보처리방침
      </Link>
      에 동의하게 됩니다.
    </p>
  );
}
