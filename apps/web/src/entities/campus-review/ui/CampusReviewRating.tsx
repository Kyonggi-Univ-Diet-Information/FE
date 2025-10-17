import { fetchCampusReviewRating } from '../api/fetchCampusReviewRating';
import { fetchCampusReviewCount } from '../api/fetchCampusReviewCount';
import { fetchCampusReviewAverage } from '../api/fetchCampusReviewAverage';

interface ReviewRatingSectionProps {
  foodId: number;
}

export default async function CampusReviewRating({
  foodId,
}: ReviewRatingSectionProps) {
  const [rating, reviewCount, averageRating] = await Promise.all([
    fetchCampusReviewRating(foodId),
    fetchCampusReviewCount(foodId),
    fetchCampusReviewAverage(foodId),
  ]);

  const ratingPercentage = {
    '5': (rating['5'] / reviewCount) * 100,
    '4': (rating['4'] / reviewCount) * 100,
    '3': (rating['3'] / reviewCount) * 100,
    '2': (rating['2'] / reviewCount) * 100,
    '1': (rating['1'] / reviewCount) * 100,
  };

  if (reviewCount === 0) {
    return null;
  }

  return (
    <section className='flex items-center rounded-2xl border p-6'>
      <div className='flex h-full w-2/5 max-w-40 flex-col items-start justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-3xl font-black'>
            {averageRating.toFixed(1) || '0.0'}
          </span>
          <span className='font-tossFace'>
            {'⭐️'.repeat(Math.floor(averageRating))}
          </span>
        </div>
        <span className='text-sm text-gray-600'>리뷰 {reviewCount}개</span>
      </div>
      <div className='flex-1 space-y-2'>
        {Object.entries(ratingPercentage)
          .reverse()
          .map(([rating, percentage]) => (
            <RatingBar
              key={rating}
              rating={Number(rating)}
              percentage={percentage}
            />
          ))}
      </div>
    </section>
  );
}

function RatingBar({
  rating,
  percentage,
}: {
  rating: number;
  percentage: number;
}) {
  return (
    <div className='flex items-center gap-2'>
      <span className='w-6 text-xs font-medium'>{rating}</span>
      <div className='h-3 flex-1 rounded-full bg-gray-200'>
        <div
          className='bg-point/30 h-3 rounded-full'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
