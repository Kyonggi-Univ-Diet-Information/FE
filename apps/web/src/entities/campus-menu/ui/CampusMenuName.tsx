import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { fetchCampusMenuName } from '../api/fetchCampusMenuName';

export default async function CampusMenuName({
  menuId,
  className,
}: {
  menuId: number;
  className?: string;
}) {
  const locale = await getLocale();
  const menuName = await fetchCampusMenuName(menuId);

  return (
    <Suspense>
      <span className={className}>
        {locale === 'en' ? menuName.nameEn : menuName.name}
      </span>
    </Suspense>
  );
}
