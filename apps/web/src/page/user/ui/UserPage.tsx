import { Suspense } from 'react';


import { Loader } from '@/components/common';

import { fetchUserFavReview } from '@/api/user/fetchUserFavReview';
import { fetchUserInfo } from '@/api/user/fetchUserInfo';
import { fetchUserReview } from '@/api/user/fetchUserReview';

import UserPageClient from './UserPageClient';


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
