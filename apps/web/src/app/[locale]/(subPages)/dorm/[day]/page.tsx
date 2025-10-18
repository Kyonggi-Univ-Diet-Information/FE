import { DORM_DAY_KEY } from '@/entities/dorm-menu/model/dormDay';
import { DormMenuPage, DormMenuPageProps } from '@/page/dorm';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const days = Object.keys(DORM_DAY_KEY);

  return locales.flatMap(locale =>
    days.map(day => ({
      locale,
      day,
    })),
  );
}

const Page = async (props: DormMenuPageProps) => {
  return <DormMenuPage {...props} />;
};

export default Page;
