'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { FoodCourt } from '@/shared/config/endpoint';

import SearchFilter from './SearchFilter';
import { SORTING_TYPE, SortingType } from '../model/search';

interface SearchInputProps {
  showFilter?: boolean;
}

export default function SearchInput({ showFilter = false }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  const t = useTranslations('search');
  const q = searchParams.get('q');

  const restaurantType =
    (searchParams.get('restaurantType') as FoodCourt) || ('ALL' as FoodCourt);
  const sort = (searchParams.get('sort') as SortingType) || SORTING_TYPE.BASIC;

  useEffect(() => {
    if (q) {
      setSearch(q);
    }
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    const params = new URLSearchParams();
    params.set('q', search);
    if (showFilter) {
      if (restaurantType !== ('ALL' as FoodCourt))
        params.set('restaurantType', restaurantType);
      if (sort !== SORTING_TYPE.BASIC) params.set('sort', sort);
    }
    router.replace(`/search/result?${params.toString()}`);
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
    <div className='flex flex-col gap-4'>
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
      {showFilter && (
        <SearchFilter restaurantType={restaurantType} sort={sort} />
      )}
    </div>
  );
}
