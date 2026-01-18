'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/features/auth/hooks';
import { logout } from '@/features/auth/lib/logout';

import { PATCHNOTE_URL, INQUIRY_URL } from '@/shared/config';
import { Card, Section } from '@/shared/ui';

import UserRevokeModal from './UserRevokeModal';
import { fetchUserProvider } from '../api/fetchUserProvider';
import { submitRevokeReason } from '../api/submitRevokeReason';
import { submitUserRevoke } from '../api/submitUserRevoke';

interface UserPageClientProps {
  userInfo: {
    email: string;
    name: string;
    createdAt: string;
  };
  likedReviewCount: number;
  writtenReviewCount: number;
}

export default function UserPageClient({
  userInfo,
  likedReviewCount,
  writtenReviewCount,
}: UserPageClientProps) {
  const { refresh } = useAuth();
  const router = useRouter();
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [selectedReasonType, setSelectedReasonType] = useState<string>('');
  const [isRevoking, setIsRevoking] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      await refresh();
      router.push('/');
    }
  };

  const handleRevoke = async (reasonType: string) => {
    try {
      setIsRevoking(true);
      await submitRevokeReason(reasonType);
      const provider = await fetchUserProvider();
      const result = await submitUserRevoke(provider);
      if (result.success) {
        await refresh();
        router.push('/');
      }
    } catch (error) {
      alert('회원 탈퇴에 실패했어요. 오류가 반복되면 관리자에게 문의해주세요.');
      console.error(error);
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <>
      <Section>
        <div>
          <h1 className='text-lg'>
            <b className='text-xl font-semibold'>{userInfo.name}</b> 님,
            안녕하세요!
          </h1>
          <p className='text-sm text-gray-500'>{userInfo.email}</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Card className='min-w-1/2' href='/user/fav'>
            <p className='flex items-center justify-between'>
              좋아요한 리뷰
              <ChevronRight size={16} />
            </p>
            <Card.Content>
              <span className='font-semibold'>{likedReviewCount}</span>
            </Card.Content>
          </Card>
          <Card className='min-w-1/2' href='/user/my'>
            <p className='flex items-center justify-between'>
              작성한 리뷰
              <ChevronRight size={16} />
            </p>
            <Card.Content>
              <span className='font-semibold'>{writtenReviewCount}</span>
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
        <button onClick={() => setIsRevokeModalOpen(true)} className='text-start text-red-500'>
          회원탈퇴
        </button>
      </Section>

      <UserRevokeModal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        onConfirm={handleRevoke}
        isLoading={isRevoking}
        refresh={refresh}
        router={router}
        selectedReasonType={selectedReasonType}
        setSelectedReasonType={setSelectedReasonType}
      />
    </>
  );
}
