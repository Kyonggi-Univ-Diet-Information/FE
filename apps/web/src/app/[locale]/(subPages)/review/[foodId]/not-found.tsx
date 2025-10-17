import { Link } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui/Button';
import { Title } from '@/components/layout';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4'>
      <Title>{t('title')}</Title>
      <p className='text-gray-600'>{t('description')}</p>
      <Link href='/review'>
        <Button variant='default' size='lg'>
          {t('backToList')}
        </Button>
      </Link>
    </div>
  );
}
