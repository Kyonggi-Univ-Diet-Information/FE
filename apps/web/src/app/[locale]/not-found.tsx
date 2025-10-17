import { Link } from '@/shared/i18n/routing';
import { Button } from '@/components/common/Button';
import { Title } from '@/components/layout';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-4'>
      <Title>{t('title')}</Title>
      <p className='text-gray-600'>{t('wrongPath')}</p>
      <Link href='/'>
        <Button variant='default' size='lg'>
          {t('returnHome')}
        </Button>
      </Link>
    </div>
  );
}
