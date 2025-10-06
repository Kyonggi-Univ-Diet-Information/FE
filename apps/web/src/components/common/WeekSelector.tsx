'use client';

import React from 'react';
import { cn } from '@/lib/utils/index';
import { Button } from './Button';
import { WEEKDAYS } from '@/lib/constants';

interface WeekSelectorProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

export default function WeekSelector({
  selectedDate,
  onDateSelect,
  className,
}: WeekSelectorProps) {
  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  };

  const weekStart = getWeekStart(selectedDate || new Date());
  const weekDates = getWeekDates(weekStart);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={cn('space-y-4', className)}>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          {weekStart.toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
          })}{' '}
          -{' '}
          {weekDates[6].toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className='grid grid-cols-7 gap-2'>
        {weekDates.map((date, index) => {
          const isToday = date.getTime() === today.getTime();
          const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          const isWeekend = index === 0 || index === 6;

          return (
            <Button
              key={date.toISOString()}
              variant={isSelected ? 'default' : 'outline'}
              size='sm'
              className={cn(
                'flex h-16 flex-col items-center justify-center p-2 text-xs',
                'hover:bg-primary/10 transition-colors',
                isToday && !isSelected && 'ring-primary/50 ring-2',
                isWeekend && 'text-red-500',
                isSelected && 'bg-primary text-primary-foreground',
              )}
              onClick={() => onDateSelect(date)}
            >
              <span className='font-medium'>{WEEKDAYS[index]}</span>
              <span className='text-lg font-bold'>{date.getDate()}</span>
            </Button>
          );
        })}
      </div>

      {selectedDate && (
        <div className='rounded-lg bg-gray-50 p-3 text-center'>
          <p className='text-sm text-gray-600'>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
            의 식단을 확인할게요.
          </p>
        </div>
      )}
    </div>
  );
}
