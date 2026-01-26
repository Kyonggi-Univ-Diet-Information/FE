'use client';

import { AlertCircle, Ban, MoreVertical, Trash2Icon } from 'lucide-react';

import { type FoodCourt } from '@/shared/config';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { type ReportReason } from '../api/fetchReportReasons';
import { useReviewAction } from '../model/useReviewAction';

interface ReviewActionMenuProps {
  type: FoodCourt;
  foodId: number;
  reviewId: number;
  isMyReview: boolean;
}

interface ReviewActionSelectProps {
  isMyReview: boolean;
  pending: boolean;
  value: string;
  onActionChange: (value: string) => void;
}

interface ReviewReportDialogProps {
  reportReasons: ReportReason[];
  selectedReason: string;
  pending: boolean;
  onSelectReason: (reason: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReviewActionMenu({
  type,
  foodId,
  reviewId,
  isMyReview,
}: ReviewActionMenuProps) {
  const {
    pending,
    showReportDialog,
    reportReasons,
    selectedReason,
    selectValue,
    setSelectedReason,
    handleAction,
    handleReport,
    handleCloseReportDialog,
  } = useReviewAction({ type, foodId, reviewId });

  return (
    <>
      <ReviewActionSelect
        isMyReview={isMyReview}
        pending={pending}
        value={selectValue}
        onActionChange={handleAction}
      />

      {showReportDialog && (
        <ReviewReportDialog
          reportReasons={reportReasons}
          selectedReason={selectedReason}
          pending={pending}
          onSelectReason={setSelectedReason}
          onClose={handleCloseReportDialog}
          onConfirm={handleReport}
        />
      )}
    </>
  );
}

function ReviewActionSelect({
  isMyReview,
  pending,
  value,
  onActionChange,
}: ReviewActionSelectProps) {
  return (
    <Select value={value} onValueChange={onActionChange} disabled={pending}>
      <SelectTrigger
        icon={false}
        className='size flex items-center justify-center border-none bg-transparent p-0 hover:bg-gray-100 focus:ring-0 focus:ring-offset-0 active:scale-95'
      >
        <MoreVertical className='size-5 text-gray-400' />
      </SelectTrigger>
      <SelectContent align='end' className='min-w-[120px]'>
        {isMyReview ? (
          <SelectItem
            value='delete'
            className='text-destructive focus:text-destructive'
          >
            <div className='flex items-center gap-2'>
              <Trash2Icon className='size-4' />
              <span>삭제하기</span>
            </div>
          </SelectItem>
        ) : (
          <>
            <SelectItem value='block'>
              <div className='flex items-center gap-2'>
                <Ban className='size-4' />
                <span>사용자 차단</span>
              </div>
            </SelectItem>
            <SelectItem
              value='report'
              className='text-destructive focus:text-destructive'
            >
              <div className='flex items-center gap-2'>
                <AlertCircle className='size-4' />
                <span>신고하기</span>
              </div>
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}

function ReviewReportDialog({
  reportReasons,
  selectedReason,
  pending,
  onSelectReason,
  onClose,
  onConfirm,
}: ReviewReportDialogProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black/30 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50'
          disabled={pending}
        >
          ✕
        </button>

        <div className='flex flex-col gap-4'>
          <ReviewReportDialogHeader />
          <ReviewReportReasonList
            reasons={reportReasons}
            selectedReason={selectedReason}
            pending={pending}
            onSelectReason={onSelectReason}
          />
          <ReviewReportDialogFooter
            pending={pending}
            disabled={!selectedReason}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewReportDialogHeader() {
  return (
    <div>
      <h3 className='text-lg font-semibold'>리뷰 신고</h3>
      <p className='mt-1 text-sm text-gray-600'>신고 사유를 선택해주세요</p>
    </div>
  );
}

interface ReviewReportReasonListProps {
  reasons: ReportReason[];
  selectedReason: string;
  pending: boolean;
  onSelectReason: (reason: string) => void;
}

function ReviewReportReasonList({
  reasons,
  selectedReason,
  pending,
  onSelectReason,
}: ReviewReportReasonListProps) {
  if (reasons.length === 0) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <div className='border-t-point size-6 animate-spin rounded-full border-2 border-gray-200' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {reasons
        .filter(reason => reason.type !== 'ETC')
        .map(reason => (
          <button
            key={reason.type}
            onClick={() => onSelectReason(reason.type)}
            disabled={pending}
            className={cn(
              'w-full rounded-xl border p-4 text-left text-sm transition-all active:scale-[0.98]',
              selectedReason === reason.type
                ? 'border-point bg-point/5 text-point font-semibold'
                : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100',
              pending && 'opacity-50',
            )}
          >
            {reason.description}
          </button>
        ))}
    </div>
  );
}

interface ReviewReportDialogFooterProps {
  pending: boolean;
  disabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ReviewReportDialogFooter({
  pending,
  disabled,
  onClose,
  onConfirm,
}: ReviewReportDialogFooterProps) {
  return (
    <div className='flex justify-end gap-2'>
      <button
        onClick={onClose}
        className='rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50'
        disabled={pending}
      >
        취소
      </button>
      <button
        onClick={onConfirm}
        className='rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50'
        disabled={pending || disabled}
      >
        {pending ? '처리 중...' : '신고하기'}
      </button>
    </div>
  );
}
