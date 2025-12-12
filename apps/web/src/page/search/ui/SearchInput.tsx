'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FOOD_COURT, FoodCourt } from '@/shared/config/endpoint';

import SearchFilter from './SearchFilter';
import {
  FOOD_TYPE,
  FoodType,
  SORTING_TYPE,
  SortingType,
} from '../model/search';

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  const t = useTranslations('search');
  const q = searchParams.get('q');

  const foodType =
    (searchParams.get('foodType') as FoodType) || FOOD_TYPE.DEFAULT;
  const restaurantType =
    (searchParams.get('restaurantType') as FoodCourt) || FOOD_COURT.KYONGSUL;
  const sort = (searchParams.get('sort') as SortingType) || SORTING_TYPE.BASIC;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <form className='relative' onSubmit={handleSubmit}>
        <button type='submit' onClick={onSubmit}>
          <SearchIcon className='size-4.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 active:text-gray-300' />
        </button>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          className='w-full rounded-2xl border p-2.5 pl-3 pr-10 text-[15px] focus:outline-none'
          type='text'
          placeholder={t('placeholder')}
        />
      </form>
      <SearchFilter
        foodType={foodType}
        restaurantType={restaurantType}
        sort={sort}
      />
    </>
  );
}
