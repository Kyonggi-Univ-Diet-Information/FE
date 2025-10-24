'use client';

import { logout } from '@/features/auth/action';
import { useAuth } from '@/features/auth/hooks';
import { Link, useRouter } from '@/shared/i18n/routing';
import { useUserInfo } from '../api/useUserInfo';
import { Card, Loader, Section } from '@/shared/ui';
import { useUserFavReview } from '../api/useUserFavReview';
import { useUserReview } from '../api/useUserReview';
import { ChevronRight } from 'lucide-react';

export default function UserPage() {
  const { isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();

  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfo();
  const { data: userFavReview, isLoading: isUserFavReviewLoading } =
    useUserFavReview(0, 'KYONGSUL');
  const { data: userReview, isLoading: isUserReviewLoading } = useUserReview(
    0,
    'KYONGSUL',
  );

  const likedReviewCount = userFavReview?.totalElements;
  const writtenReviewCount = userReview?.totalElements;

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      await refresh();
      router.push('/');
    }
  };

  if (isLoading && isUserInfoLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <div>잘못된 접근이에요.</div>;
  }

  const renderReviewCount = (loading: boolean, count: number | undefined) => {
    if (loading) return <span>-</span>;
    return <span>{count ?? '-'}</span>;
  };

  return (
    <>
      <Section>
        <div>
          <h1 className='text-lg'>
            <b className='text-xl font-semibold'>{userInfo?.name}</b> 님,
            안녕하세요!
          </h1>
          <p className='text-sm text-gray-500'>{userInfo?.email}</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Card className='min-w-1/2'>
            <p className='flex items-center justify-between'>
              좋아요한 리뷰
              <ChevronRight size={16} />
            </p>
            <Card.Content>
              <span className='font-semibold'>
                {renderReviewCount(isUserFavReviewLoading, likedReviewCount)}
              </span>
            </Card.Content>
          </Card>
          <Card className='min-w-1/2'>
            <p className='flex items-center justify-between'>
              작성한 리뷰
              <ChevronRight size={16} />
            </p>
            <Card.Content>
              <span className='font-semibold'>
                {renderReviewCount(isUserReviewLoading, writtenReviewCount)}
              </span>
            </Card.Content>
          </Card>
        </div>
      </Section>
      <Section>
        <Link href='/user/patch-note'>패치노트</Link>
        <Link href='/user/inquiry'>문의하기</Link>
        <button onClick={handleLogout} className='text-start'>
          로그아웃
        </button>
      </Section>
    </>
  );
}
