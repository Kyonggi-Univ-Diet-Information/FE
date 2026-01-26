import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

import { type FoodCourt } from '@/shared/config';

import {
  fetchReportReasons,
  type ReportReason,
} from '../api/fetchReportReasons';
import { removeReview } from '../api/removeReview';
import { submitReviewBlock } from '../api/submitReviewBlock';
import { submitReviewReport } from '../api/submitReviewReport';

interface UseReviewActionProps {
  type: FoodCourt;
  foodId: number;
  reviewId: number;
}

export function useReviewAction({
  type,
  foodId,
  reviewId,
}: UseReviewActionProps) {
  const { mutate } = useSWRConfig();
  const [pending, setPending] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReasons, setReportReasons] = useState<ReportReason[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');

  useEffect(() => {
    if (showReportDialog) {
      if (reportReasons.length === 0) {
        fetchReportReasons().then(setReportReasons);
      }
    } else {
      setSelectedReason('');
    }
  }, [showReportDialog, reportReasons.length]);

  const handleDelete = async () => {
    const confirmed = window.confirm('리뷰를 삭제하시겠습니까?');
    if (!confirmed) return;

    setPending(true);
    try {
      await removeReview(reviewId, foodId, type);
      mutate(key => Array.isArray(key) && key[0] === 'reviews');
    } finally {
      setPending(false);
    }
  };

  const handleBlock = async () => {
    const confirmed = window.confirm(
      '이 사용자를 차단하시겠습니까?\n차단한 사용자의 게시물은 더 이상 표시되지 않으며, 차단 해제는 불가능합니다.',
    );
    if (!confirmed) return;

    setPending(true);
    try {
      const result = await submitReviewBlock(reviewId, foodId, type);
      if (result.success) {
        mutate(key => Array.isArray(key) && key[0] === 'reviews');
        alert('사용자를 차단했습니다.');
      } else {
        alert(result.error || '차단에 실패했습니다.');
      }
    } finally {
      setPending(false);
    }
  };

  const handleShowReportDialog = () => {
    setShowReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    if (!pending) {
      setShowReportDialog(false);
    }
  };

  const handleReport = async () => {
    if (!selectedReason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }

    setPending(true);
    try {
      const result = await submitReviewReport(reviewId, type, selectedReason);
      if (result.success) {
        alert('신고가 접수되었습니다.');
        setShowReportDialog(false);
      } else {
        alert(result.error || '신고에 실패했습니다.');
      }
    } finally {
      setPending(false);
    }
  };

  const handleAction = async (value: string) => {
    setSelectValue(value);
    if (value === 'delete') {
      await handleDelete();
    } else if (value === 'block') {
      await handleBlock();
    } else if (value === 'report') {
      handleShowReportDialog();
    }
    setSelectValue('');
  };

  return {
    pending,
    showReportDialog,
    reportReasons,
    selectedReason,
    selectValue,
    setSelectedReason,
    handleAction,
    handleReport,
    handleCloseReportDialog,
  };
}
