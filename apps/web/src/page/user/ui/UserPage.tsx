'use client';

import { ChevronRight } from 'lucide-react';

import { useAuth } from '@/features/auth/hooks';
import { logout } from '@/features/auth/lib/logout';

import { PATCHNOTE_URL, INQUIRY_URL } from '@/shared/config';
import { Link, useRouter } from '@/shared/i18n/routing';
import { Card, Loader, Section } from '@/shared/ui';

import { useUserFavReview } from '../api/useUserFavReview';
import { useUserInfo } from '../api/useUserInfo';
import { useUserReview } from '../api/useUserReview';

export default function UserPage() {
  const { isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();

  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfo();
  const { data: userFavReview, isLoading: isUserFavReviewLoading } =
    useUserFavReview(0);
  const { data: userReview, isLoading: isUserReviewLoading } = useUserReview(0);

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
          <Card className='min-w-1/2' href='/user/fav'>
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
          <Card className='min-w-1/2' href='/user/my'>
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
        <Link target='_blank' rel='noopener noreferrer' href={PATCHNOTE_URL}>
          패치노트
        </Link>
        <Link target='_blank' rel='noopener noreferrer' href={INQUIRY_URL}>
          문의하기
        </Link>
        <button onClick={handleLogout} className='text-start'>
          로그아웃
        </button>
      </Section>
    </>
  );
}
