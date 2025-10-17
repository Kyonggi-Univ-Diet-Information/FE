'use client';

import { useState } from 'react';
import { WeekSelector, Modal, Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { DORM_DAY_KEY } from '@/lib/constants';

export default function DormMenuDateModal() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleModalSave = () => {
    const dateKey = DORM_DAY_KEY[selectedDate?.getDay() ?? 0];
    router.replace(`/?date=${dateKey}`);
  };

  return (
    <Modal>
      <Modal.Header
        title='날짜를 선택해주세요'
        subtitle='이번 주 경기드림타워 식단을 확인해보세요.'
      />
      <WeekSelector
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        className='px-4'
      />
      <Modal.Footer>
        <Button onClick={handleModalSave}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
}
