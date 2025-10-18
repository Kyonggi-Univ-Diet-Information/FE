import { getLocale } from 'next-intl/server';
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
    <span className={className}>
      {locale === 'en' ? menuName.nameEn : menuName.name}
    </span>
  );
}
