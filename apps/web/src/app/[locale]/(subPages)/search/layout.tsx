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
      <div className='scrollbar-hide md:top-46 absolute inset-0 bottom-20 top-44 overflow-y-scroll md:bottom-0 md:grid md:grid-cols-2 md:gap-4 md:px-4 md:pb-20'>
        {children}
      </div>
    </>
  );
}
