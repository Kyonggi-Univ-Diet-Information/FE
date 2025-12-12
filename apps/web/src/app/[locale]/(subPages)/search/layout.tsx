import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import { SearchInput } from '@/page/search';

import { Section } from '@/shared/ui';

export default async function SearchLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations('search');
  return (
    <>
      <Section.Header
        className='-mb-4 gap-2'
        title={t('title')}
        subtitle={t('subtitle')}
      >
        <SearchInput />
      </Section.Header>
      <div className='scrollbar-hide top-46 absolute inset-0 overflow-y-scroll pb-20 md:grid md:h-fit md:grid-cols-2 md:gap-4 md:px-4'>
        {children}
      </div>
    </>
  );
}
