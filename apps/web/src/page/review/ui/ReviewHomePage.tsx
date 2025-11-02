import { ReviewView } from '@/entities/review';

import { FOOD_COURT } from '@/shared/config';

export default async function ReviewHomePage() {
  return (
    <>
      <ReviewView type={FOOD_COURT.KYONGSUL} />
    </>
  );
}
