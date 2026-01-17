import { Suspense } from 'react';

import { Loader } from '@/shared/ui';

import UserPageClient from './UserPageClient';
import { fetchUserFavReview } from '../api/fetchUserFavReview';
import { fetchUserInfo } from '../api/fetchUserInfo';
import { fetchUserReview } from '../api/fetchUserReview';

export default async function UserPage() {
  const [userInfo, userFavReview, userReview] = await Promise.all([
    fetchUserInfo(),
    fetchUserFavReview(0),
    fetchUserReview(0),
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <UserPageClient
        userInfo={userInfo}
        likedReviewCount={userFavReview.totalElements}
        writtenReviewCount={userReview.totalElements}
      />
    </Suspense>
  );
}

